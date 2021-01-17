from flask import Flask
from flask_socketio import SocketIO, send, emit
from os import urandom

import sys
import random
import string

app = Flask(__name__, static_url_path='', static_folder='static/')
app.config['SECRET_KEY'] = urandom(24)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
socketio = SocketIO(app)

@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

@socketio.on('next')
def handle_next():
    direction = random.choice(["North", "West", "South", "East"])
    emit("data", {"direction": direction})

@socketio.on('connect')
def test_connect():
    print('Client connected')

@socketio.on('disconnect')
def test_disconnect(client):
    print('Client disconnected' + client)

print("\n------------------------------")
print("> Version 1.0.0")
print("> Starting Traffic Simulation")
print("------------------------------\n")