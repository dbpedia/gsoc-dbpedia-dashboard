from flask import Flask

def initialize_app():
    app = Flask(__name__)

    # set configs, URLs, etc. to 'app'
    # for example:
    # @app.route('/')
    # def hello():
    #     return 'Hello, World!'

    return app
