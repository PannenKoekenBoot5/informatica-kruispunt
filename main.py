# Import modules
from flask import Flask
from flask_socketio import SocketIO, send, emit
from os import urandom

import sys
import random
import string

# Create Flask app and specify static url path and folder
app = Flask(__name__, static_url_path='', static_folder='static/')
app.config['SECRET_KEY'] = urandom(24)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Inject Socket IO (our websocket handler) into the Flask app
socketio = SocketIO(app)

# Serve static index html file
@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

# Handle next request from websocket, by creating an array of random directions and then emitting to client
@socketio.on('next')
def handle_next():
    directions = ["North", "East", "South", "West"]
    emit("data", {"directions": random.sample(directions, len(directions))})

# Print to console on client connect
@socketio.on('connect')
def handle_connection():
    print('Client connected')

# Print to console on client disconnect
@socketio.on('disconnect')
def handle_disconnection():
    print('Client disconnected')

print("\n------------------------------")
print("> Version 1.0.0")
print("> Starting Traffic Simulation")
print("------------------------------\n")