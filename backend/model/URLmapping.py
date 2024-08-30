from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class URLMapping(db.Model):
    __tablename__ = 'LinkMapping'
    id = db.Column(db.Integer, primary_key=True)
    original_url = db.Column(db.String(500), nullable=False)
    short_url = db.Column(db.String(6), unique=True, nullable=False)
    status = db.Column(db.String())
