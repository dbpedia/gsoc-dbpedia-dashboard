from flask import Flask, request
from . import dashboards

app = None


def get_app():
    global app
    if not app:
        app = Flask(__name__)

    # set configs, URLs, etc. to 'app'
    initialize_routes(app)

    return app


def initialize_routes(app):
    @app.route("/dashboards", methods=["POST"])
    def get_dashboards():
        user_id = request.json['userid']
        dashboards_ = dashboards.Dashboards().get_dashboards_by_user_id(user_id)
        return "Here are the dashboards!"
