from sqlalchemy import text

from server.database import engine


def create(data):
	values = ','.join(list(map(
		lambda x: f"('{x[0]}', '{x[1]}')", data
	)))

	with engine.connect() as conn:
		query = text(
			f"""
			INSERT INTO currency (currency, symbol)
			VALUES {values}
			"""
		)
		conn.execute(query)
		conn.commit()

def define_rates(data):
	values = ','.join(list(map(
		lambda x: f"('{x[0]}', '{x[1]}', {x[2]})", data
	)))

	with engine.connect() as conn:
		query = text(
			f"""
			INSERT INTO exchange_rate (from_currency, to_currency, rate)
			VALUES {values}
			"""
		)
		conn.execute(query)
		conn.commit()

def get_symbol(currency):
	with engine.connect() as conn:
		query = text(
			f"""
			SELECT symbol FROM currency
			WHERE currency = '{currency}'
			"""
		)
		result = conn.execute(query)
		return dict(result.first())['symbol']
