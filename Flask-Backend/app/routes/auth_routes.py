from flask import Blueprint, request, jsonify
try:
    from app.utils.csv_user_store import search_user,check_password,save_user,init_csv
except ImportError:
    from utils.csv_user_store import search_user,check_password,save_user,init_csv

from flask_jwt_extended import (create_access_token,create_refresh_token,jwt_required,get_jwt_identity)

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    if search_user(email):
        return jsonify({"message":"user already exists"}), 400

    save_user(email,password)
    return token_method(email)




@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user_data=search_user(email)

    if not email or not password:
        return jsonify({"message": "Missing fields"}), 400 

    if not user_data:
        return jsonify({"message","user doesn't exist"}), 400

    if not check_password(password,user_data['password']):
        return jsonify({"message","Password incorrect"}), 400

    return token_method(email)

@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    email = get_jwt_identity()
    new_access = create_access_token(identity=email)
    return jsonify({"access_token": new_access})


def token_method(email:str):
    access_token=create_access_token(identity=email)
    refresh_token=create_refresh_token(identity=email)
    return jsonify({
        "access_token":access_token,
        "refresh_token":refresh_token,
        "email":email
    }), 200


