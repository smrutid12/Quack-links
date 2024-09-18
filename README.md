# Quack Links 🦆🔗

Quack Links is a URL shortener inspired by TinyURL. It allows users to convert long URLs into short, manageable links that are easier to share. The application is built with **React** for the frontend, **Flask** for the backend, and uses **PostgreSQL** as the database. The project is hosted on **Render**.

![image](https://github.com/user-attachments/assets/)

## Features

- Shorten long URLs into easily shareable short links.
- Responsive design, works on all device sizes.
- Real-time link creation with success and error messages.
- Frontend built with React for a smooth user experience.
- Flask-powered backend to handle link shortening and redirect logic.
- PostgreSQL for reliable and efficient database storage.
- Hosted and deployed on Render.

## Tech Stack

- **Frontend**: React
- **Backend**: Flask (Python)
- **Database**: PostgreSQL
- **Hosting**: Render

## Project Structure

```bash
├── client               # React Frontend
│   ├── public
│   └── src
├── server               # Flask Backend
│   ├── app.py
│   ├── config.py
│   └── routes
└── README.md
```
##Installation

#Prerequisites
-Node.js (for React)
-Python 3.x (for Flask)
-PostgreSQL (Database)

##Setup Instructions
###Clone the repository:
```bash
Copy code
git clone https://github.com/your-username/quack-links.git
cd quack-links
```
##Setup Frontend (React):
```bash
Copy code
cd client
npm install
npm start
```
##Setup Backend (Flask):
###Create a virtual environment:
```bash
Copy code
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```
###Install dependencies:
```bash
Copy code
pip install -r requirements.txt
Set up PostgreSQL and update the config.py file with your DB credentials.
```
###Run the Flask server:
```bash
Copy code
python server/app.py
```
##Setup PostgreSQL:
###Create a PostgreSQL database named Quack_links.
-Inside the database, create a table LinkMapping with columns for storing the original and shortened URLs.
##Running the Application:
###Start the React frontend (client):
```bash
Copy code
npm start
```
###Start the Flask backend (server):
```bash
Copy code
python server/app.py
The app should now be running locally. You can access it at http://localhost:3000.
```
##API Endpoints

###POST /quack_links
~~~
Description: Creates a new short URL for the given long URL.
Request Body: { "long_url": "<your-long-url>" }
Response: Returns the shortened URL.
~~~
###GET /api/<short_url>
~~~
Description: Redirects to the original URL associated with the short link.
~~~

##Deployment
###The application is hosted on Render:

###Frontend: Hosted on Render's web service.
###Backend: Hosted as a Flask API on Render.
###Database: PostgreSQL database managed by Render.

##Contributing

Fork the repository.
Create a new feature branch (git checkout -b feature/my-feature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/my-feature).
Open a pull request.
License

This project is licensed under the MIT License - see the LICENSE file for details.

Happy Quacking! 🦆
