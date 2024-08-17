from flask import Flask, request, redirect, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from backend.utils.generate_short_url import generate_short_url
from backend.modal.url_mapping import URLMapping 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@localhost/url_shortener'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        original_url = request.form.get('original_url')
        if original_url:
            short_url = generate_short_url(original_url)
            # Check if the short URL already exists
            existing_mapping = URLMapping.query.filter_by(short_url=short_url).first()
            if not existing_mapping:
                new_mapping = URLMapping(original_url=original_url, short_url=short_url)
                db.session.add(new_mapping)
                db.session.commit()
            return render_template('index.html', short_url=short_url)
    return render_template('index.html')

@app.route('/<short_url>')
def redirect_to_url(short_url):
    url_mapping = URLMapping.query.filter_by(short_url=short_url).first_or_404()
    return redirect(url_mapping.original_url)


if __name__ == "__main__":
    app.run(debug=True, port=5000)