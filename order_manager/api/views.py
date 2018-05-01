from flask import Blueprint
from flask_restful import Api

from order_manager.api.resources import (
    UserResource,
    UsersResource,
    OrdersResource,
    CropsResource
)


blueprint = Blueprint('api', __name__, url_prefix='/api/v1')
api = Api(blueprint)


api.add_resource(UserResource, '/users/<uid>')
api.add_resource(UsersResource, '/users')
api.add_resource(CropsResource, '/crops')
api.add_resource(OrdersResource, '/orders/<oid>')
