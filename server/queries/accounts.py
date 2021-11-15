from sqlalchemy import text

from server.database import engine


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
        filters = f"WHERE account.account_num = {account_num}"
    elif user_id is not None:
        filters = f"WHERE account.user_id = {user_id}"
    else:
        raise Exception("no parameters provided to select account")

    with engine.connect() as conn:
        query = text(
            f"""
            SELECT
                account.*, currency.symbol AS currency_symbol
            FROM
                account
            JOIN
                currency on currency.currency = account.currency
            {filters}
            """
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
            f"""
            SELECT
                account.*, currency.symbol AS currency_symbol
            FROM
                account
            JOIN
                currency on currency.currency = account.currency
            {filters}
            """
        )
        result = conn.execute(query)
        return [dict(row) for row in result.all()]


# increment/decrement balance and return updated balance
def update_balance(account_num, amount, base_currency):
    with engine.connect() as conn:
        query = text(
            f"""
            UPDATE
                account as a SET a.balance =
                (
                    SELECT
                        balance + ({amount}) * e.rate
                    FROM
                        exchange_rate as e
                    WHERE
                        e.from_currency = '{base_currency}' AND
                        e.to_currency = a.currency
                )
            WHERE
                a.account_num = {account_num}
            """
        )
        conn.execute(query)
        conn.commit()

        updated = get(account_num=account_num)

    return updated['balance']
