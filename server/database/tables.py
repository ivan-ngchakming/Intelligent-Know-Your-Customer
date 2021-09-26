from sqlalchemy import (
    Table, 
    Column, 
    ForeignKey, 
    Integer, 
    String, 
    Float, 
    DateTime
)

from .metadata import metadata_obj


user_table = Table(
    "user",
    metadata_obj,
    Column('user_id', Integer, primary_key=True),
    Column('name', String(30), nullable=False),
    Column('password', String(30), nullable=False)
)

login_history_table = Table(
    "login_history",
    metadata_obj,
    Column('login_date', DateTime, primary_key=True),
    Column('user_id', ForeignKey('user.user_id'), primary_key=True, nullable=False), 
    Column('confidence', Float, nullable=False),
    Column('logout_date', DateTime),
)
