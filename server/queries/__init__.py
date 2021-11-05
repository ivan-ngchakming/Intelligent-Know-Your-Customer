import os
import random
from datetime import datetime, timedelta

from . import users, models, accounts, transactions, currency

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def fill_dummy_data():
    currencies = [
        ('HKD', '$'),
        ('USD', '$'),
        ('EUR', '€'),
        ('GBP', '£'),
        ('CAD', '$'),
    ]
    currency.create(currencies)

    rates = [
        ('HKD', 'USD', 0.13),
        ('HKD', 'EUR', 0.11),
        ('HKD', 'GBP', 0.09),
        ('HKD', 'CAD', 0.16),

        ('USD', 'HKD', 7.77),
        ('USD', 'EUR', 0.86),
        ('USD', 'GBP', 0.73),
        ('USD', 'CAD', 1.24),

        ('EUR', 'USD', 1.16),
        ('EUR', 'HKD', 9.05),
        ('EUR', 'GBP', 0.85),
        ('EUR', 'CAD', 1.44),

        ('GBP', 'USD', 1.38),
        ('GBP', 'EUR', 1.18),
        ('GBP', 'HKD', 10.7),
        ('GBP', 'CAD', 1.70),

        ('CAD', 'USD', 0.81),
        ('CAD', 'EUR', 0.69),
        ('CAD', 'GBP', 0.59),
        ('CAD', 'HKD', 6.29),
    ]
    currency.define_rates(rates)

    usernames = ['peter', 'kittie', 'ivan']
    user_ids = []
    account_ids = []

    for username in usernames:
        user_id = users.create(username)['user_id']
        user_ids.append(user_id)

        model_path = os.path.abspath(os.path.join(BASE_DIR, f'../recognition/models'))
        models.create(user_id, model_path)

        account1 = accounts.create(user_id, 'Current', 2000, 'HKD')
        account2 = accounts.create(user_id, 'Savings', 10000, 'HKD')
        account2 = accounts.create(user_id, 'Euro', 500, 'EUR')
        account_ids += [account1['account_num'], account2['account_num']]

    # generate some random transactions
    now = datetime.now()
    for i in range(random.randint(15, 30)):
        now += timedelta(days=random.randint(1,10)) + timedelta(hours=random.randint(1, 10)) + timedelta(minutes=random.randint(1, 30))
        dt = now.strftime("%Y-%m-%d %H:%M:%S")
        from_account, to_account = random.sample(account_ids, 2)
        transactions.create(from_account, to_account, f'transaction {i+1}', random.randint(-100, 100), dt)


def populate():
    fill_dummy_data()
