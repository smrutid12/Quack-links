from flask_restx import Api
from api.generate_short_url import generate_quack_url

api = Api()

api.add_namespace(generate_quack_url, '/')