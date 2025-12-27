import hashlib
import os
from flask import request, redirect
from urllib.parse import urlparse
from flask_restx import Resource, Namespace, fields
from model.URLmapping import db, URLMapping

generate_quack_url = Namespace('Generate Quack Link', description="API for creating and fetching shortened URLs")
QUACK_LINK_URL = os.getenv('QUACK_LINK_URL')

# Define input and output models
url_post_model = generate_quack_url.model('URLPostModel', {
    'original_url': fields.String(required=True, description='The original URL to shorten'),
})

url_response_model = generate_quack_url.model('URLResponseModel', {
    'short_url': fields.String(description='The shortened URL'),
    'url_id': fields.String(description='The unique ID of the shortened URL')
})

error_response_model = generate_quack_url.model('ErrorResponseModel', {
    'error': fields.String(description='Error message'),
})

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
    @generate_quack_url.expect(url_post_model)
    @generate_quack_url.response(200, 'Success', url_response_model)
    @generate_quack_url.response(400, 'Bad Request', error_response_model)
    def post(self):
        """Creates a shortened URL for the provided original URL."""
        original_url = request.json.get('original_url')
        if original_url:
            if not is_valid_url(original_url):
                return {"error": "Invalid URL provided"}, 400
            
            short_url, short_url_id = generate_short_url(original_url)
            existing_mapping = URLMapping.query.filter_by(short_url=short_url_id).first()
            
            if not existing_mapping:
                new_mapping = URLMapping(original_url=original_url, short_url=short_url_id, status='active')
                db.session.add(new_mapping)
                db.session.commit()


            return {"short_url": short_url, "url_id": short_url_id}, 200
        return {"error": "No URL provided"}, 400


class FetchQuackLink(Resource):
    @generate_quack_url.response(302, 'Redirecting to original URL')
    @generate_quack_url.response(404, 'Not Found', error_response_model)
    def get(self, short_url_id):
        """Fetches the original URL for the provided ID and redirects to it."""
        url_mapping = URLMapping.query.filter_by(short_url=short_url_id).first()
        if not url_mapping:
            return {'error': 'URL not found'}, 404
        return redirect(url_mapping.original_url, code=302)
    
generate_quack_url.add_resource(GenerateQuackLink, 'quack_link')
generate_quack_url.add_resource(FetchQuackLink, '<string:short_url_id>')