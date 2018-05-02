from flask import request, jsonify, make_response
from flask_restful import Resource

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from order_manager.models import (
    Users,
    Orders,
    Crops,
    Carts
)

from order_manager.schemas import (
    OrderSchema,
    CropSchema,
    CartSchema
)


from order_manager.extensions import db
from order_manager.helpers.paginator import paginate

from mongoengine.errors import (
    NotUniqueError,
    DoesNotExist,
    ValidationError
)


class OrdersResource(Resource):

    decorators = [jwt_required]

    def get(self):
        schema = OrderSchema()
        user_id = get_jwt_identity()

        user = Users.objects.get(id=user_id)

        order = Orders.objects(ordered_by=user)
        return schema.jsonify(order, many=True)

    def post(self):
        schema = OrderSchema()
        user_id = get_jwt_identity()

        user = Users.objects.get(id=user_id)
        final_cart = user.cart

        if not final_cart.items:
            return make_response(
                jsonify(msg='Cart is empty, please add items to cart to order'), 422
            )

        order = Orders(ordered_by=user, items=final_cart.items,
                       total=final_cart.current_total, customer=final_cart.customer)
        order.save()
        final_cart.update(current_total=0.0, items=[])
        return schema.jsonify(order)


class OrderResource(Resource):

    decorators = [jwt_required]

    def get(self, oid):
        schema = OrderSchema()
        user_id = get_jwt_identity()

        user = Users.objects.get(id=user_id)

        try:
            order = Orders.objects.get(id=oid)
        except DoesNotExist:
            return make_response(
                jsonify(msg='No order found in that ID'), 404
            )
        except ValidationError:
            return make_response(
                jsonify(msg='No order found in that ID'), 404
            )
        return schema.jsonify(order)


class CropsResource(Resource):

    decorators = [jwt_required]

    def get(self):
        schema = CropSchema()

        crop = Crops.objects()
        return schema.jsonify(crop, many=True)

    def post(self):

        schema = CropSchema(partial=True)

        if not request.is_json:
            return jsonify({'msg': 'Missing JSON in request'}), 400

        crop, errors = schema.load(request.json)
        if errors:
            return errors, 422

        try:
            crop.save()
        except NotUniqueError:
            return make_response(
                jsonify({'msg': 'A crop in that name exists!'}),
                422
            )
        return schema.jsonify(crop)


class CartResource(Resource):
    decorators = [jwt_required]

    def patch(self):

        if not request.is_json:
            return jsonify({'msg': 'Missing JSON in request'}), 400

        schema = CartSchema()
        cart_data, errors = schema.load(request.json)
        if errors:
            return errors, 422
        user_id = get_jwt_identity()
        cart = None
        user = Users.objects.get(id=user_id)
        try:
            cart = user.cart
        except DoesNotExist:
            cart = Carts(current_total=0.0, items=[],
                         customer=cart_data.get('customer'))
            cart.save()
            user.update(cart=cart)
            user.reload()

        json_data = request.get_json()
        cart.reload()

        added_items = json_data.get('items')

        current_cart_items = cart.items
        current_total = 0
        # Update card
        for item in added_items:
            item_id = item.get('id')
            qty = float(item.get('qty', 1))
            item = Crops.objects.get_or_404(id=item_id)
            item_price = item.price * qty
            current_total += item_price
            for curr in current_cart_items:
                if item == curr.get('item'):
                    cart.update(pull__items=curr)
                    curr['qty'] = qty
                    curr['total'] = item_price
                    cart.update(add_to_set__items=curr)
            else:
                cart.update(add_to_set__items={
                    'item': item, 'total': item_price, 'qty': qty})
                cart.update(current_total=current_total)
        user.reload()

        cart, errors = schema.dump(user.cart)
        return cart
