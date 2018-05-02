# order_manager

### Instructions
1. Clone the project and go into root folder
2. Install the python
```
$ pip install -r requirements.txt
```
3. Head over to `frontend` folder to install npm dependencies
```
$ cd frontend
$ yarn install
```
4. Optionally you can build the frontend from src, it is not required. Just run
```
$ yarn run build
```
5. Start the backend API from project root folder using gunicorn
```
$ gunicorn -b 0.0.0.0:6363 run:application --log-level=DEBUG
```

### REST API Endpoints

| Sl. No. | METHOD | ROUTE | DATA | RESPONSE |
| --------- | --------- | --------- | --------- | --------- | 
|1. | POST | /auth/signup | JSON : `{'email':'sreenadh@datahut.co','passwd_digest':'12345678','phone':8281143747}` | `{'email':'sreenadh@datahut.co','username':null,'phone':8281143747}` |
|2. | POST | /auth/login | JSON : `{'email':'sreenadh@datahut.co','passwd_digest':'12345678'}` | `{'access_token': 'TOKEN_HERE', 'refresh_token': 'TOKEN_HERE'}` | 
|3. | GET* | /api/v1/crops |  | `[{"id": "5ae9812519185b39ebe5ad02","name": "Tomoto","price": 30.0},...]` | 
|4. | PATCH* | /api/v1/users/cart | JSON : `{"customer":"Sreenadh TC","items":[{"id":"5ae80f2f19185b5135b4b9f0","qty":10},{"id":"5ae80f2919185b5135b4b9ef","qty":5},{"id":"5ae80f0319185b5135b4b9ed","qty":10}]}` | `{"current_total": 880.0,"customer": "Sreenadh TC","id": "5ae9654d19185b0d14a87dd9","items": [{"item": {"id": "5ae80f2f19185b5135b4b9f0","name": "Wheat","price": 40.0},"total": 400.0,"qty": 10.0},...]}` | 
|5. | POST* | /api/v1/orders |  | `{"customer": "Sreenadh TC","id": "5ae9831a19185b3d7585c12f","items": [{"item": {"id": "5ae9812519185b39ebe5ad09","name": "Potato","price": 35.0},"qty": 1.5,"total": 52.5},...],"ordered_by": {"email": "sreenadh@datahut.co","phone": "8281143747","username": null},"ordered_on": "2018-05-02T14:51:24.111000+00:00","status": "Placed","total": 852.5}` | 
|6. | GET* | /api/v1/orders |  | `[{"customer": "Sreenadh TC","id": "5ae9831a19185b3d7585c12f","items": [{"item": {"id": "5ae9812519185b39ebe5ad09","name": "Potato","price": 35.0},"qty": 1.5,"total": 52.5},...],"ordered_by": {"email": "sreenadh@datahut.co","phone": "8281143747","username": null},"ordered_on": "2018-05-02T14:51:24.111000+00:00","status": "Placed","total": 852.5}]` | 
|7. | GET* | /api/v1/crops/<order_id> |  | `{"customer": "Sreenadh TC","id": "5ae9831a19185b3d7585c12f","items": [{"item": {"id": "5ae9812519185b39ebe5ad09","name": "Potato","price": 35.0},"qty": 1.5,"total": 52.5},...],"ordered_by": {"email": "sreenadh@datahut.co","phone": "8281143747","username": null},"ordered_on": "2018-05-02T14:51:24.111000+00:00","status": "Placed","total": 852.5}` | 

> \* marked methods require a Bearer token