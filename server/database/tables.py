import sqlalchemy as sa
from sqlalchemy.sql import func

from .metadata import metadata_obj


user_table = sa.Table(
    "user",
    metadata_obj,
    sa.Column('user_id', sa.Integer, primary_key=True),
    sa.Column('name', sa.String(30), nullable=False),
    sa.Column('password', sa.String(30)),
    sa.Column('joined_date', sa.DateTime, nullable=False, server_default=func.now()),

)

login_history_table = sa.Table(
    "login_history",
    metadata_obj,
    sa.Column('login_date', sa.DateTime, primary_key=True, server_default=func.now()),
    sa.Column('user_id', sa.ForeignKey('user.user_id'), primary_key=True, nullable=False),
    sa.Column('confidence', sa.Float, nullable=False),
    sa.Column('logout_date', sa.DateTime),
)

account_table = sa.Table(
    "account",
    metadata_obj,
    sa.Column('account_num', sa.Integer, primary_key=True),
    sa.Column('owner', sa.ForeignKey('user.user_id'), nullable=False),
    sa.Column('balance', sa.Float, nullable=False),
    sa.Column('account_type', sa.String(10), nullable=False),
    sa.Column('currency', sa.String(10), nullable=False)
)

transaction_table = sa.Table(
    'transaction',
    metadata_obj, 
    sa.Column('transaction_id', sa.Integer, primary_key=True),
    sa.Column('transaction_date', sa.DateTime, nullable=False, server_default=func.now()),
    sa.Column('amount', sa.Float, nullable=False),
    sa.Column('recipient', sa.ForeignKey('account.account_num'), nullable=False),
    sa.Column('payer', sa.ForeignKey('account.account_num'), nullable=False),
)

model_table = sa.Table(
    'model',
    metadata_obj,
    sa.Column('model_id', sa.Integer, primary_key=True),
    sa.Column('path', sa.String(300), nullable=False),
    sa.Column('date_created', sa.DateTime, server_default=func.now()),
    sa.Column('user', sa.ForeignKey('user.user_id'), nullable=False)
)

image_table = sa.Table(
    'image',
    metadata_obj,
    sa.Column('image_id', sa.Integer, primary_key=True),
    sa.Column('path', sa.String(300), nullable=False),
    sa.Column('date_created', sa.DateTime, server_default=func.now()),
    sa.Column('model', sa.ForeignKey('model.model_id'), nullable=False)
)
