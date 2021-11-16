# Intelligent Know Your Customer

Project for HKU course COMP3278 2021-22

Group 30

## Project Structure

    .
    ├── designs                 # ER-diagram and Wireframe
    ├── public                  # Public files for react app
    ├── server                  # PyQt Web Server
    │   ├── api                 # pyqt channels to connect front-end and back-end
    │   ├── database            # Database tables definition and schema
    │   ├── queries             # SQL queries and mutations
    │   │   ├── __init__.py     # dummy data populating function
    │   │   └── ...
    │   ├── recognition         # Face recognition models
    │   └── utils
    ├── src                     # React application source code
    └── main.py                 # Application entry point

## Database Setup

You need to create a mysql database manually first before starting the app.

However, there is no need to import any sql db files, as the IKYC app will automatically create all tables (and insert data if specified) on app startup.

The [`./ikyc.sql`](./ikyc.sql) db file is only for reference, and serve no functional purpose. It's table creation content is equivalent to the content in [`./server/database/tables.py`](./server/database/tables.py).

## Setting Up Development Environment

### Environment variables

All environment variables are stored in `.env`.
This is where we store sensitive information that we do not want to include in the source code, such as database login information.

1. Create a copy of `.env.example` and rename it as `.env`.

2. Fill in the missing information, such as database login username and password.

Below is a sample .env file

```py
# development mode connects to the `yarn start` app at localhost:3000
# production mode will serve the react build files at `./build`
ENVIRONMENT=development

# create mysql database first before launch the app
# enter the connection configuration of the newly created mysql database below
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=facerecognition

# for debugging react app within the qt app context, may leave blank if not in development 
QTWEBENGINE_REMOTE_DEBUGGING=3001

# Populate database with dummy data on startup
POPULATE_DATABASE=false

# Prevent browser from launching on `yarn start`
BROWSER=None
```

To access variables defined in `.env`, package `python-dotenv` is used.

```py
from dotenv import load_dotenv

load_dotenv()
```

Access ENVIRONMENT variable for example

```py
ENVIRONMENT = os.environ['ENVIRONMENT']
```

### React GUI

1. Install yarn
<https://classic.yarnpkg.com/en/docs/install/#windows-stable>

2. Install node dependencies

```sh
yarn
```

3. Run react app

```bash
yarn start
```

4. (Optional) build the react app
   The react app will be exported at `./build`, set env var to `production` to use files from this directory

```bash
yarn build
```

### PyQt Web Server

1. Install virtualenv

```bash
pip install virtualenv
```

2. Create virtualenv

```bash
python -m venv ./venv
```

3. Activate virtualenv

```bash
# win
venv/Scripts/activate.bat

# mac
source venv/bin/activate
```

4. Install python dependencies

```bash
pip install -r requirements.txt
```

5. Run Application

```bash
python main.py
```

Alternatively, conda environments can also be used in a similar manner by creating and activating a new conda environment and continue from step 4.
