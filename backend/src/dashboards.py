from . import db_operations
import os


class Dashboards:

    def __init__(self):
        self.__client = db_operations.Database().get_db_client()
        self.__db = os.getenv('dbpedia')
        self.__dashboards_collection = os.getenv('dashboards')

    def get_dashboards_by_user_id(self, user_id):
        dashboards_collection = self.__client[self.__db][self.__dashboards_collection]
        user_dashboards = []
        for dashboard in dashboards_collection.find({"user_id": user_id}):
            user_dashboards.append(dashboard)
        return user_dashboards
