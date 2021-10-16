import os

from sqlalchemy import create_engine

from .metadata import metadata_obj
from .tables import *


# Collection mysql login configurations from environment variables
host = os.environ['DATABASE_HOST']
port = os.environ['DATABASE_PORT']
username = os.environ['DATABASE_USER']
password = os.environ['DATABASE_PASSWORD']
database = os.environ['DATABASE_NAME']

# Create an SQLAlchemy engine that connects to MySQL database
engine = create_engine(f"mysql+mysqlconnector://{username}:{password}@{host}:{port}/{database}", echo=False, future=True)

def create_all():
    metadata_obj.create_all(engine)

def drop_all():
    metadata_obj.drop_all(engine)
