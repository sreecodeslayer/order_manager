from marshmallow import (
    fields,
    validate,
    post_load
)

from order_manager.extensions import ma
from order_manager.models import (
    Crops,
    Orders
)

from .user import UserSchema
from mongoengine.errors import DoesNotExist

class ObjectId(fields.Field):
    def _serialize(self, value, attr, obj):
        if value is None:
            return ''
        return str(value)

class CropSchema(ma.Schema):
    _id = ObjectId(dump_only=True)
    name = ma.String()
    price = ma.Float()

    @post_load
    def make_crop(self, data):
        try:
            return Crops.objects.get(**data)
        except DoesNotExist:
            return Crops(**data)

class CartItemSchema(ma.Schema):
    _id = ObjectId(dump_only=True)
    item = ma.Nested(CropSchema)
    qty = ma.Float()
    total = ma.Float()

class CartSchema(ma.Schema):
    _id = ObjectId(dump_only=True)
    items = ma.List(ma.Nested(CartItemSchema))
    current_total = ma.Float()

class OrderSchema(ma.Schema):
    _id = ObjectId(dump_only=True)
    ordered_by = ma.Nested(UserSchema, dump_only=True)
    items = ma.List(ma.Nested(CartItemSchema))
    total = ma.Float()
    ordered_on = ma.DateTime()

    @post_load
    def make_order(self, data):
        print(data)
        return Orders(**data)

