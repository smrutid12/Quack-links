import hashlib
from flask import request
from flask_restx import Resource, Namespace
from model.URLmapping import db, URLMapping

generate_quack_url = Namespace('Generate Quack Link')

def generate_short_url(original_url):
    # Create a SHA-256 hash of the original URL
    hash_object = hashlib.sha256(original_url.encode())
    # Get the first 6 characters of the hash as the short URL
    short_url = hash_object.hexdigest()[:6]
    return short_url

class GenerateQuackLink(Resource):
    def post(self):
        original_url = request.json.get('original_url')  # Using JSON payload instead of form data
        if original_url:
            short_url = generate_short_url(original_url)
            print(short_url,'ooooooooooooooooo')
            # existing_mapping = URLMapping.query.filter_by(short_url=short_url).first()
            # if not existing_mapping:
            #     new_mapping = URLMapping(original_url=original_url, short_url=short_url)
            #     db.session.add(new_mapping)
            #     db.session.commit()
            return {"short_url": short_url}
        return {"error": "No URL provided"}, 400

    def get(self, short_url):
        print(short_url)
        # url_mapping = URLMapping.query.filter_by(short_url=short_url).first()
        # if not url_mapping:
        #     return url_mapping.original_url
        return {'status':'Success', 'message':'URL found', 'data':short_url}, 200


generate_quack_url.add_resource(GenerateQuackLink, '/quack_link')
generate_quack_url.add_resource(GenerateQuackLink, '/quack_link/<string:short_url>')