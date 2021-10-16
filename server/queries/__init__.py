import os

from . import users, models

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def fill_dummy_data():
    username = 'peter'
    user_id = users.create(username)['user_id']
    model_path = os.path.abspath(os.path.join(BASE_DIR, f'../recognition/models/{username}'))
    models.create(user_id, model_path)

def populate():
    fill_dummy_data()
