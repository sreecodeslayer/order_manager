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
    id = ObjectId(dump_only=True)
    name = ma.String()
    price = ma.Float()

    @post_load
    def make_crop(self, data):
        try:
            return Crops.objects.get(**data)
        except DoesNotExist:
            return Crops(**data)

class CartItemSchema(ma.Schema):
    id = ObjectId(dump_only=True)
    item = ma.Nested(CropSchema)
    qty = ma.Float()
    total = ma.Float()

class CartSchema(ma.Schema):
    id = ObjectId(dump_only=True)
    customer = ma.String(required=True)
    items = ma.List(ma.Nested(CartItemSchema))
    current_total = ma.Float()

# Only to Serialize order
class OrderSchema(ma.Schema):
    id = ObjectId(dump_only=True)
    ordered_by = ma.Nested(UserSchema, dump_only=True)
    items = ma.List(ma.Nested(CartItemSchema), dump_only=True)
    status = ma.String(dump_only=True)
    total = ma.Float(dump_only=True)
    ordered_on = ma.DateTime(dump_only=True)
