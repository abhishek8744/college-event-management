from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app)

# Dynamic path for SQLite (important for Render)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'site.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    imageUrl = db.Column(db.String(255), nullable=False)

class TeamMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(100), nullable=False)

# Routes
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([
        {
            'id': event.id,
            'title': event.title,
            'date': event.date,
            'location': event.location,
            'description': event.description,
            'imageUrl': event.imageUrl
        } for event in events
    ])

@app.route('/team', methods=['GET'])
def get_team():
    members = TeamMember.query.all()
    return jsonify([
        {
            'id': member.id,
            'name': member.name,
            'role': member.role
        } for member in members
    ])

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print(f'Login attempt: {email}, {password}')
    return jsonify({'message': 'Login attempt received'}), 200

@app.route('/create-event', methods=['POST'])
def create_event():
    data = request.get_json()
    new_event = Event(
        title=data.get('title'),
        date=data.get('date'),
        location=data.get('location'),
        description=data.get('description'),
        imageUrl=data.get('imageUrl')
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify({
        'message': 'Event created successfully!',
        'event': {
            'id': new_event.id,
            'title': new_event.title,
            'date': new_event.date,
            'location': new_event.location,
            'description': new_event.description,
            'imageUrl': new_event.imageUrl
        }
    }), 201

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    print('Contact form received:', data)
    return jsonify({'message': 'Message sent successfully'}), 200

# Create tables if not exist (once)
with app.app_context():
    db.create_all()

# Do not run app.run() on Render
if __name__ == '__main__':
    app.run(debug=True)
