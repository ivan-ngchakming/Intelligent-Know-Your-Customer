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

    if account_num is not None:
        filters = f"WHERE account_num = {account_num}"
    elif user_id is not None:
        filters = "WHERE user_id = {user_id}"
    else:
        raise Exception("no parameters provided to select account")
        
    with engine.connect() as conn:
        query = text(
            f"SELECT * FROM account {filters}"
        )
        result = conn.execute(query)
        try:
            return dict(result.first())
        except TypeError:
            return None


# get account info by account number or user ID
def list_accounts(user_id=None, username=None):
    filters = ""
    if user_id is not None:
        filters = f"WHERE owner = {user_id}"
    elif username is not None:
        filters = f"""
        JOIN
            user on user.user_id = account.owner
        WHERE
            user.name = '{username}'
        """
    with engine.connect() as conn:
        query = text(
            f"SELECT * FROM account {filters}"
        )
        result = conn.execute(query)
        return [dict(row) for row in result.all()]


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
