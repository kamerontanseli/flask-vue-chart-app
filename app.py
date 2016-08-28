from flask import Flask, render_template, send_from_directory
from flask_assets import Environment, Bundle
app = Flask(__name__)
assets = Environment(app)

js = Bundle('js/**/*.js', filters='jsmin', output='js/bundle.js')
assets.register('js_all', js)

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
