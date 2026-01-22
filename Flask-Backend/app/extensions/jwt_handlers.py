from flask_jwt_extended import JWTManager
from flask import jsonify

def register_jwt_handlers(jwt: JWTManager):
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            "error": "TOKEN_EXPIRED",
            "message": "Access token has expired"
        }), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({
            "error": "TOKEN_INVALID",
            "message": "Invalid token"
        }), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            "error": "TOKEN_MISSING",
            "message": "Authorization token is missing"
        }), 401

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return jsonify({
            "error": "TOKEN_REVOKED",
            "message": "Token has been revoked"
        }), 401