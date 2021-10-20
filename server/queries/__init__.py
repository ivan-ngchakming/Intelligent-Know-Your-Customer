import os
import random
from datetime import datetime, timedelta

from . import users, models, accounts, transactions

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def fill_dummy_data():
    usernames = ['peter', 'kittie', 'ivan']
    user_ids = []
    account_ids = []

    for username in usernames:
        user_id = users.create(username)['user_id']
        user_ids.append(user_id)

        model_path = os.path.abspath(os.path.join(BASE_DIR, f'../recognition/models'))
        models.create(user_id, model_path)

        account1 = accounts.create(user_id, 'Current', 2000, 'HKD')
        account2 = accounts.create(user_id, 'Savings', 9999, 'HKD')
        account_ids += [account1['account_num'], account2['account_num']]

    # generate some random transactions
    now = datetime.now()
    for i in range(random.randint(10, 20)):
        now += timedelta(days=random.randint(1,10)) + timedelta(hours=random.randint(1, 10)) + timedelta(minutes=random.randint(1, 30))
        dt = now.strftime("%Y-%m-%d %H:%M:%S")
        from_account, to_account = random.sample(account_ids, 2)
        transactions.create(from_account, to_account, f'transaction {i+1}', random.randint(-100, 100), dt)


def populate():
    fill_dummy_data()
