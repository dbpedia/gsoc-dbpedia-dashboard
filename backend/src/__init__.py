from flask import Flask, json, request, jsonify
from . import dashboards
from datetime import date
app = None


def get_app():
    global app
    if not app:
        app = Flask(__name__)

    # set configs, URLs, etc. to 'app'
    dashboardsObj = dashboards.Dashboards()
    initialize_routes(app, dashboardsObj)

    return app


def initialize_routes(app, dashboardsObj):
    @app.route("/getdashboards", methods=["POST"])
    def get_dashboards():
        user_id = request.json['userid']
        dashboards_ = dashboardsObj.get_dashboards_by_user_id(user_id)
        if dashboards_:
            for dashboard in dashboards_:
                del dashboard["_id"]
            dashboards_ = {"status": True, "dashboards": dashboards_}
        else:
            dashboards_ = {"status": False}
        return jsonify(dashboards_)

    @app.route("/adddashboard", methods=["POST"])
    def add_dashboard():
        user_id = request.json['userid']
        dashboard_name = request.json['dashboard_name']
        date_created = date.today().strftime("%d/%m/%Y")
        status = dashboardsObj.add_dashboard(user_id, dashboard_name, date_created)
        return jsonify({"status": status})

    @app.route("/saveendpoint", methods=["POST"])
    def save_endpoint():
        user_id = request.json['user_id']
        endpoint = request.json['endpoint']
        status = dashboardsObj.save_endpoint()
        return jsonify({"status": status})
