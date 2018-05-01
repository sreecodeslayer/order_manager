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

class ObjectId(fields.Field):
    def _serialize(self, value, attr, obj):
        if value is None:
            return ''
        return str(value)

class CropsSchema(ma.Schema):
    _id = ObjectId(dump_only=True)
    name = ma.String()
    price = ma.Float()

    @post_load
    def make_crop(self, data):
        return Crops(**data)

class OrdersSchema(ma.Schema):
    _id = ObjectId(dump_only=True)
    ordered_by = ma.Nested(UserSchema, dump_only=True)
    items = ma.List(CropSchema)
    total = ma.Float()
    ordered_on = ma.DateTime()

    @post_load
    def make_order(self, data):
        return Orders(**data)

