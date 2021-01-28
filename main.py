# Import modules
from flask import Flask
from flask_socketio import SocketIO, send, emit
from os import urandom

import sys
import random
import string

# Create Flask app and specify static file url path and folder name, to allow for easy loading of css and js files.
app = Flask(__name__, static_url_path='', static_folder='static/')
app.config['SECRET_KEY'] = urandom(24)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Inject Socket IO (our websocket handler) into the Flask app
socketio = SocketIO(app)

# Serve main html file
@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

# Utilize websocket as they are high performance and emit directions to client
@socketio.on('next')
def handle_next():
    directions = ["North", "East", "South", "West"]
    emit("data", {"directions": random.sample(directions, len(directions))})

# Notify user client has connected
@socketio.on('connect')
def handle_connection():
    print('Client connected')

# Notify user client has disconnected
@socketio.on('disconnect')
def handle_disconnection():
    print('Client disconnected')

print("\n------------------------------")
print("> Version 1.0.0")
print("> Starting Traffic Simulation")
print("------------------------------\n")
