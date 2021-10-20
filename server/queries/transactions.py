import datetime

from sqlalchemy import select, insert, update
from sqlalchemy import func

from server.database import engine
from server.database.tables import transaction_table

# def create(user_id, confidence):
#     with engine.connect() as conn:
#         conn.execute(insert(login_history_table),
#         [
#             {'user_id': user_id, 'confidence': confidence},
#         ])
#         conn.commit()
#
#
# def list_all(user_id):
#     with engine.connect() as conn:
#         result = conn.execute(
#             select(login_history_table)
#             .where(login_history_table.c.user_id==user_id)
#             .order_by(login_history_table.c.login_date.desc())
#             .limit(5)
#         )
#         return [dict(row) for row in result.all()]
#
# def create(user_id, description, **kwargs):
#     with engine.connect() as conn:
#         connect.execute('')
