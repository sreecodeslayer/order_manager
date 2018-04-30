DEBUG = True
SECRET_KEY = "changeme"

HOST = 'localhost'
PORT = 27017
DB = 'ORDER_MANAGER'

MONGODB_SETTINGS = [{
    'db': DB,
    'host': HOST,
    'port': PORT
}]
