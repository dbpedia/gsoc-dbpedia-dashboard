import os
import pymongo
import urllib.parse

class Dashboards:

    def __init__(self):
        # self.__client = pymongo.MongoClient('localhost', 27017)
        self.__client = pymongo.MongoClient("mongodb+srv://test:admin@cluster0.1znag.mongodb.net/dbpedia?retryWrites=true&w=majority")
        self.__db = 'dbpedia'
        self.__dashboards_collection = 'dashboards'

    def get_dashboards_by_user_id(self, user_id):
        dashboards_collection = self.__client[self.__db][self.__dashboards_collection]
        user_dashboards = []
        for dashboard in dashboards_collection.find({"user_id": user_id}):
            user_dashboards.append(dashboard)
        return user_dashboards

    def add_dashboard(self, user_id, dashboard_name, date_created):
        dashboards_collection = self.__client[self.__db][self.__dashboards_collection]
        try:
            dashboards_collection.insert_one({
                    "user_id": user_id,
                    "name": dashboard_name,
                    "date_created": date_created,
                    "status": "draft"
                })
        except:
            return False
        return True
