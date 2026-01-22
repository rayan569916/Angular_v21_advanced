from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
import requests

nba_route=Blueprint('nba',__name__)

@nba_route.route('/nba_summary', methods=['GET'])
@jwt_required()
def nba_summary():
    response = requests.get('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard')
    return jsonify(response.json())


