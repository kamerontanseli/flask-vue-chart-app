;(function(){

  var ctx = document.querySelector("#myChart").getContext("2d");

  Vue.config.delimiters = ['[[', ']]'];

  function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
  function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
  function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
  function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

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
                      var c = el.bck_color;
                      return "rgba("+hexToR(c)+","+hexToG(c)+","+hexToB(c)+",0.5)";
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
