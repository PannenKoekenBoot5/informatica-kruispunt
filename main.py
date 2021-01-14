from flask import Flask
from flask_socketio import SocketIO, send, emit

import random
import string

app = Flask(__name__, static_url_path='', static_folder='static/')
app.config['SECRET_KEY'] = 'suckmydick'
socketio = SocketIO(app)

if __name__ == '__main__':
    socketio.run(app)

@app.route('/')
def hello_world():
    return app.send_static_file('index.html')

@socketio.on('data')
def handle_data(data):
    print('Received data: ' + data)

@socketio.on('next')
def handle_next():
    print('Received command to proceed to next stage')

@socketio.on('connect')
def test_connect():
    print('Client connected')

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')