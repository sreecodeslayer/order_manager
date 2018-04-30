from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from order_manager.models import (
    Users,
    Orders
)
from order_manager.schemas import OrdersSchema
from order_manager.extensions import db
from order_manager.helpers.paginator import paginate

from mongoengine.errors import NotUniqueError

class OrdersResource(Resource):

    decorators = [jwt_required]

    def get(self, oid):
        schema = OrdersSchema()

        order = Orders.objects.get_or_404(id=oid)
        return schema.jsonify(order)

    def post(self):

        schema = OrdersSchema(partial=True)

        if not request.is_json:
            return jsonify({'msg': 'Missing JSON in request'}), 400

        order, errors = schema.load(request.json)
        if errors:
            return errors, 422

        try:
            order.save()
        except NotUniqueError:
            return jsonify({'msg': 'An order in that ID exists!'}), 422
        return schema.jsonify(order)
