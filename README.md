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
