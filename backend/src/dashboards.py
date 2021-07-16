import json
from io import StringIO
import pymongo
from SPARQLWrapper import SPARQLWrapper, CSV
import pandas as pd


class Dashboards:

    def __init__(self):
        # self.__client = pymongo.MongoClient('localhost', 27017)
        self.__client = pymongo.MongoClient(
            "mongodb+srv://test:admin@cluster0.1znag.mongodb.net/dbpedia?retryWrites=true&w=majority")
        self.__db = 'dbpedia'
        self.__dashboards_collection = 'dashboards'

    def __execute_sparql(self, endpoint, query, response_format):
        sparql = SPARQLWrapper(endpoint)

        sparql.setQuery(query=query)
        sparql.setReturnFormat(response_format)

        print("fetching results...")
        results = sparql.query().convert()
        return results

    def get_dashboards_by_user_id(self, user_id):
        dashboards_collection = self.__client[self.__db][self.__dashboards_collection]
        user_dashboards = []
        for dashboard in dashboards_collection.find({
            "user_id": user_id
        }):
            user_dashboards.append(dashboard)
        return user_dashboards

    def get_dashboard(self, user_id, dashboard_name, with_query=False):
        dashboards_collection = self.__client[self.__db][self.__dashboards_collection]
        dashboard = dashboards_collection.find_one({"user_id": user_id, "name": dashboard_name})
        if with_query:
            blocks_data = []
            endpoint = dashboard["endpoint"]
            for block in dashboard["blocks"]:
                block_data = self.__execute_sparql(endpoint, block["sparql_query"], CSV)
                block_data = pd.read_csv(StringIO(block_data.decode("UTF-8")), sep=",")
                block_data = {
                    block["selected_label"]: block_data[block["selected_label"]].tolist(),
                    block["selected_value"]: block_data[block["selected_value"]].tolist()
                }
                blocks_data.append(block_data)
            return dashboard, blocks_data
        return dashboard, []

    def add_dashboard(self, user_id, dashboard_name, date_created):
        dashboards_collection = self.__client[self.__db][self.__dashboards_collection]
        try:
            dashboards_collection.insert_one({
                "user_id": user_id,
                "name": dashboard_name,
                "date_created": date_created,
                "status": "Draft",
                "endpoint": "",
                "blocks": []
            })
        except:
            return False
        return True

    def save_endpoint(self, user_id, dashboard_name, endpoint):
        dashboards_collection = self.__client[self.__db][self.__dashboards_collection]
        try:
            dashboards_collection.update(
                {"user_id": user_id, "name": dashboard_name},
                {"$set": {
                    "endpoint": endpoint
                }}, upsert=False
            )
        except:
            return False
        return True

    def execute_query(self, user_id, dashboard_name, sparql_query):
        try:
            dashboard, _ = self.get_dashboard(user_id, dashboard_name)
            sparql_endpoint = dashboard["endpoint"]
            if sparql_endpoint != "" and sparql_query != "":
                results = self.__execute_sparql(sparql_endpoint, sparql_query, CSV)
                results = pd.read_csv(StringIO(results.decode("UTF-8")), sep=",")
                columns = results.columns.tolist()
                results = results.to_json(orient="records")
                return True, json.loads(results), columns
            return False, "", []
        except:
            return False, "", []

    def save_block(self, user_id, dashboard_name, sparql_query, chart_type, selected_label, selected_value):
        try:
            dashboard, _ = self.get_dashboard(user_id, dashboard_name)
            blocks = dashboard["blocks"]
            if type(blocks) is dict:
                blocks = []
            blocks.append({
                "sparql_query": sparql_query,
                "chart_type": chart_type,
                "selected_label": selected_label,
                "selected_value": selected_value
            })
            dashboards_collection = self.__client[self.__db][self.__dashboards_collection]
            dashboards_collection.update(
                {"user_id": user_id, "name": dashboard_name},
                {"$set": {
                    "blocks": blocks
                }}, upsert=False
            )
            return True
        except:
            return False
