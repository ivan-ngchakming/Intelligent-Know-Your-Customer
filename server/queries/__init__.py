import os

from . import users, accounts, models

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def fill_dummy_data():
    username = 'peter'
    user_id = users.create(username)['user_id']

    model_path = os.path.abspath(os.path.join(BASE_DIR, f'../recognition/models/{username}'))
    models.create(user_id, model_path)

    account1 = accounts.create(user_id, 'Current', 2000, 'HKD')
    print(account1)
    account2 = accounts.create(user_id, 'Savings', 9999, 'HKD')
    print(account2)


def populate():
    fill_dummy_data()
