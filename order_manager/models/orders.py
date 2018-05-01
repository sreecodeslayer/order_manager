from order_manager.extensions import db, pwd_context
from datetime import datetime, timedelta

from .users import Users

class Crops(db.Document):
    '''Mongodb Model for Crops'''
    name = db.StringField()
    price = db.FloatField()    

    def __init__(self, **kwargs):
        super(Crops, self).__init__(**kwargs)

class Orders(db.Document):
    '''Mongodb Model for Orders'''
    ordered_by = db.ReferenceField(Users)
    items = db.ListField(db.ReferenceField(Crops))
    total = db.FloatField(default=0)
    ordered_on = db.DateTimeField(
        default=datetime.utcnow() + timedelta(hours=5, minutes=30))

    meta = {
        'indexes': ['ordered_on']
    }

    def __init__(self, **kwargs):
        super(Orders, self).__init__(**kwargs)
