from flask import Flask, render_template

from order_manager import auth, api
from order_manager.extensions import db, jwt


def create_app(config=None, testing=False, cli=False):
    '''Application factory, used to create application
    '''
    app = Flask('order_manager')

    @app.route('/')
    def index():
        return render_template('index.html')

    configure_app(app, testing)
    configure_extensions(app, cli)
    register_blueprints(app)

    return app


def configure_app(app, testing=False):
    '''set configuration for application
    '''
    # default configuration
    app.config.from_object('order_manager.config')

    if testing is True:
        # override with testing config
        app.config.from_object('order_manager.configtest')
    else:
        # override with env variable, fail silently if not set
        app.config.from_envvar(
            'ORDER_MANAGER_CONFIG', silent=True)


def configure_extensions(app, cli):
    '''configure flask extensions
    '''
    db.init_app(app)
    jwt.init_app(app)


def register_blueprints(app):
    '''register all blueprints for application
    '''
    app.register_blueprint(auth.views.blueprint)
    app.register_blueprint(api.views.blueprint)
