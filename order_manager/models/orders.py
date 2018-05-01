from order_manager.extensions import db, pwd_context
from datetime import datetime, timedelta

from .users import Users

class Crops(db.Document):
    '''Mongodb Model for Crops'''
    name = db.StringField(unique=True)
    price = db.FloatField()    

    meta = {
        'indexes': ['name']
    }
    
    def __init__(self, **kwargs):
        super(Crops, self).__init__(**kwargs)

class Orders(db.Document):
    '''Mongodb Model for Orders'''
    ordered_by = db.ReferenceField(Users)
    items = db.ListField()
    total = db.FloatField(default=0)
    status= db.StringField(default='Placed')
    ordered_on = db.DateTimeField(
        default=datetime.utcnow() + timedelta(hours=5, minutes=30))

    meta = {
        'indexes': ['ordered_on','ordered_by']
    }

    def __init__(self, **kwargs):
        super(Orders, self).__init__(**kwargs)
