import pymongo


class Database:

    def __init__(self):
        self.client = None

    def get_db_client(self):
        return self.client
