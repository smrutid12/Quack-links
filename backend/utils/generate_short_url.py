import hashlib

def url_shortner():

    return ''

def generate_short_url(original_url):
    # Create a SHA-256 hash of the original URL
    hash_object = hashlib.sha256(original_url.encode())
    # Get the first 6 characters of the hash as the short URL
    short_url = hash_object.hexdigest()[:6]
    return short_url