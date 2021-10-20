import os
from random import randint
from datetime import datetime, timedelta

from . import users, models, accounts, transactions

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def fill_dummy_data():
    username = 'Peter'
    user_id = users.create(username)['user_id']

    model_path = os.path.abspath(os.path.join(BASE_DIR, f'../recognition/models/{username}'))
    models.create(user_id, model_path)

    account1 = accounts.create(user_id, 'Current', 2000, 'HKD')
    account2 = accounts.create(user_id, 'Savings', 9999, 'HKD')

    # generate some random transactions
    now = datetime.now()
    for i in range(10):
        now += timedelta(days=randint(1,10)) + timedelta(hours=randint(1, 10)) + timedelta(minutes=randint(1, 30))
        dt = now.strftime("%Y-%m-%d %H:%M:%S")
        transactions.create(account1['account_num'], 'transaction '+str(i+1), randint(-100, 100), dt)
        transactions.create(account2['account_num'], 'transaction '+str(i+1), randint(-100, 100), dt)

def populate():
    fill_dummy_data()
