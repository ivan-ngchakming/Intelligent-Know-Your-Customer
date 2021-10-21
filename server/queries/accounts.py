import datetime

from sqlalchemy import select, insert, update, text
from sqlalchemy import func

from server.database import engine
from server.database.tables import account_table


# create new account and return the account details
def create(user_id, account_type, balance, currency):
    with engine.connect() as conn:
        query = text(
            f"""
            INSERT INTO account (owner, balance, account_type, currency)
            VALUES ({user_id}, {balance}, '{account_type}', '{currency}')
            """
        )
        conn.execute(query)
        conn.commit()

        query = text(
            f"""
            SELECT * FROM account WHERE owner = {user_id}
            ORDER BY account_num DESC LIMIT 1
            """
        )
        result = conn.execute(query)
        return dict(result.first())


# get account info by account number or user ID
def get(**kwargs):
    account_num = kwargs.get('account_num')
    user_id = kwargs.get('user_id')

    with engine.connect() as conn:
        if account_num is not None:
            query = text(
                f"SELECT * FROM account WHERE account_num = {account_num}"
            )
            result = conn.execute(query)
            return dict(result.first())
        elif user_id is not None:
            print('TODO')
        else:
            raise Exception("no parameters provided to select account")


# increment/decrement balance and return updated balance
def update_balance(account_num, amount):
    with engine.connect() as conn:
        query = text(
            f"""
            UPDATE account SET balance = balance + ({amount})
            WHERE account_num = {account_num}
            """
        )
        conn.execute(query)
        conn.commit()

        updated = get(account_num=account_num)
    return updated['balance']
