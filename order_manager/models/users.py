from order_manager.extensions import db, pwd_context
from datetime import datetime, timedelta

class Carts(db.Document):
    '''Mongodb Model for Carts per user'''
    customer = db.StringField(required=True)
    current_total = db.FloatField(default=0.0)
    items = db.ListField()

class Users(db.Document):
    '''Mongodb Model for Users'''
    username = db.StringField(required=True, unique=True)
    email = db.EmailField(unique=True)
    passwd_digest = db.StringField()
    phone = db.StringField()
    cart = db.ReferenceField(Carts)

    meta = {
        'indexes': ['username', 'email']
    }

    def __init__(self, **kwargs):
        super(Users, self).__init__(**kwargs)

    def __repr__(self):
        return '(User : %s)' % self.username