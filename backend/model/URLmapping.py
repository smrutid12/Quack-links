import enum
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class LinkStatus(enum.Enum):
    active = "active"
    inactive = "inactive"

class URLMapping(db.Model):
    __tablename__ = 'LinkMapping'

    id = db.Column(db.Integer, primary_key=True)
    original_url = db.Column(db.String(500), nullable=False)
    short_url = db.Column(db.String(6), unique=True, nullable=False)
    status = db.Column(
        db.Enum(LinkStatus, name="link_status"),
        nullable=False,
        default=LinkStatus.active
    )
