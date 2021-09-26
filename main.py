import os
import sys
import threading
import logging

from dotenv import load_dotenv
from PyQt5.QtWidgets import QApplication

load_dotenv()

from server.engine import WebEngineView
from server.utils.react import serve
from server.utils.logging import get_console_handler, get_all_loggers


ENVIRONMENT = os.environ['ENVIRONMENT']

logger = logging.getLogger(__name__)
logger.addHandler(get_console_handler())


if __name__ == "__main__":
    # Serve static files build using react
    if ENVIRONMENT == 'production':
        react = threading.Thread(target=serve, daemon=True)
        react.start()
    
    # Init PyQt application
    app = QApplication(sys.argv)
    view = WebEngineView()
    print(get_all_loggers())

    # Run Application
    sys.exit(app.exec_())
