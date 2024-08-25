from flask import Flask
from flask_cors import CORS
from api import api
from model.URLmapping import db

app = Flask(__name__)

# App configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@localhost/url_shortener'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
CORS(app)
api.init_app(app)

if __name__ == "__main__":
    app.run(debug=True, port=5000)