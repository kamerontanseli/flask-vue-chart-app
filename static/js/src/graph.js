;(function(){

  var ctx = document.querySelector("#myChart").getContext("2d");

  Vue.config.delimiters = ['[[', ']]'];

  function hexToRgb(hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
  }

  var chart_parent = new Vue({
      el: "#chart_parent",
      data: {
        label: "# of Tests",
        type: "bar",
        types: ["bar", "polarArea", "pie", "doughnut"],
        data: [
          { label: "Test1", data: 20, bck_color: "#000000" },
          { label: "Test2", data: 30, bck_color: "#dddddd" }
        ]
      },
      created: function() {
        this.init_chart();
        this.update_chart();
      },
      methods: {
        init_chart: function() {
          this.chart && this.chart.destroy();
          this.chart = new Chart(ctx, {
              type: this.type,
              data: {
                labels: this.data.map(function(el){ return el.label; }),
                datasets: [{
                  label: this.label,
                  data: this.data.map(function(el){ return el.data; }),
                  backgroundColor: this.data.map(function(el){
                      var rgb = hexToRgb(el.bck_color);
                      return "rgba("+rgb.r+","+rgb.b+","+rgb.g+",0.5)";
                  })
                }]
              },
              options: {
                responsive: true,
                scales: {
                  yAxes: [{ ticks: { beginAtZero:true } }]
                }
              }
          });
        },
        update_chart: function() {
          this.init_chart();
          this.chart.update();
        },
        export: function() {
          var b64 = this.chart.toBase64Image();
          window.open(b64);
        },
        remove_data: function(index) {
          this.data.splice(index, 1);
          this.update_chart();
        },
        add_data: function() {
          this.data.push({ label: "", data: 0, bck_color: "#000000" });
          this.update_chart();
        }
      }
  });


})();
