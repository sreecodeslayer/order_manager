from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from order_manager.models import Users
from order_manager.schemas import UserSchema
from order_manager.extensions import db
from order_manager.helpers.paginator import paginate


class UserResource(Resource):

    method_decorators = [jwt_required]

    def get(self, uid):
        schema = UserSchema()

        if not request.is_json:
            return jsonify({'msg': 'Missing JSON in request'}), 400

        user = Users.objects.get_or_404(id=uid)
        return schema.jsonify(user)

    def put(self, uid):
        schema = UserSchema(partial=True)

        if not request.is_json:
            return jsonify({'msg': 'Missing JSON in request'}), 400

        user = Users.objects.get_or_404(id=uid)

        user, errors = schema.load(request.json)
        if errors:
            return errors, 422

        user.save()
        return schema.jsonify(user)

    def delete(self, uid):
        user = Users.objects.get_or_404(id=uid)

        return {'msg': 'User deleted'}


class UsersResource(Resource):

    method_decorators = [jwt_required]

    def get(self):
        schema = UserSchema(many=True)

        users = Users.objects()

        return paginate(users, schema)

    def post(self):
        schema = UserSchema()

        user, errors = schema.load(request.json)
        if errors:
            return errors, 422

        user.save()

        return schema.jsonify(user)
