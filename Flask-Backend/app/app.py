from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from extensions.jwt_handlers import register_jwt_handlers

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    jwt=JWTManager(app)
    register_jwt_handlers(jwt)

    CORS(app, origins=["http://localhost:4200",
                "http://127.0.0.1:4200",
                "http://192.168.0.126:4200"])

    from routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from routes.nba_route import nba_route
    app.register_blueprint(nba_route, url_prefix='/api/nba')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
