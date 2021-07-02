import pymongo


class Database:

    def __init__(self):
        self.___setup_db_connection()

    def ___setup_db_connection(self):
        if not self.client:
            self.client = pymongo.MongoClient()

    def get_db_client(self):
        return self.client
