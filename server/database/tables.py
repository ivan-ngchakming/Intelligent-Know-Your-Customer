from sqlalchemy import (
    Table, 
    Column, 
    ForeignKey, 
    Integer, 
    String, 
    Float, 
    DateTime
)
from sqlalchemy.sql import func

from .metadata import metadata_obj


user_table = Table(
    "user",
    metadata_obj,
    Column('user_id', Integer, primary_key=True),
    Column('name', String(30), nullable=False),
    Column('password', String(30)),
    Column('joined_date', DateTime, nullable=False, server_default=func.now()),

)

login_history_table = Table(
    "login_history",
    metadata_obj,
    Column('login_date', DateTime, primary_key=True, server_default=func.now()),
    Column('user_id', ForeignKey('user.user_id'), primary_key=True, nullable=False), 
    Column('confidence', Float, nullable=False),
    Column('logout_date', DateTime),
)
