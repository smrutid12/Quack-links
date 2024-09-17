import hashlib
import os
from flask import request
from urllib.parse import urlparse
from flask_restx import Resource, Namespace
from model.URLmapping import db, URLMapping

generate_quack_url = Namespace('Generate Quack Link')
QUACK_LINK_URL = os.getenv('QUACK_LINK_URL')

def is_valid_url(url):
    """Validates if the URL is properly formatted."""
    parsed_url = urlparse(url)
    return all([parsed_url.scheme in ['http', 'https'], parsed_url.netloc])

def generate_short_url(original_url):
    hash_object = hashlib.sha256(original_url.encode())
    short_url_id = hash_object.hexdigest()[:6]
    short_url = f"{QUACK_LINK_URL}/{short_url_id}"
    return short_url, short_url_id

class GenerateQuackLink(Resource):
    def post(self):
        original_url = request.json.get('original_url')  # Using JSON payload instead of form data
        if original_url:
            if not is_valid_url(original_url):
                return {"error": "Invalid URL provided"}, 400
            
            short_url, short_url_id = generate_short_url(original_url)
            
            existing_mapping = URLMapping.query.filter_by(short_url=short_url_id).first()
            if not existing_mapping:
                new_mapping = URLMapping(original_url=original_url, short_url=short_url_id, status = 'Success')
                db.session.add(new_mapping)
                db.session.commit()

            return {"short_url": short_url, "url_id": short_url_id}
        return {"error": "No URL provided"}, 400

    def get(self, short_url_id):
        url_mapping = URLMapping.query.filter_by(short_url=short_url_id).first()
        if not url_mapping:
            return {'status':'Failed', 'message':'URL not found'}, 404
        return {'status':'Success', 'message':'URL found', 'data': url_mapping.short_url}, 200


generate_quack_url.add_resource(GenerateQuackLink, 'quack_link')
generate_quack_url.add_resource(GenerateQuackLink, 'quack_link/<string:short_url_id>')
