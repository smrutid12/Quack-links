import os
from flask import Flask
from flask_cors import CORS
from api import api
from model.URLmapping import db

app = Flask(__name__)

POSTGRES_USERNAME = os.getenv('POSTGRES_USERNAME')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')

# App configuration
app.config['SQLALCHEMY_DATABASE_URI'] = F'postgresql://{POSTGRES_USERNAME}:{POSTGRES_PASSWORD}@localhost/Quack_links'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
CORS(app)
api.init_app(app)

if __name__ == "__main__":
   app.run(debug=True, host='0.0.0.0', port=5000)
