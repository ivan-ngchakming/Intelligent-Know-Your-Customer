import os
import logging

from PyQt5.Qt import QUrl
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtWebEngineWidgets import QWebEngineView

from server.api import Foo, Transactions

logger = logging.getLogger(__name__)

ENVIRONMENT = os.environ['ENVIRONMENT']

class WebEngineView(QWebEngineView):
    def __init__(self):
        super().__init__()

        # setup channel
        logger.debug("Setting up channels")
        self.channel = QWebChannel()
        self.channel.registerObject('transactions', Transactions(self))
        self.channel.registerObject('foo', Foo(self))
        self.page().setWebChannel(self.channel)

        logger.debug(f"Loading react app in {ENVIRONMENT} mode")
        if ENVIRONMENT == 'production':
            self.load(QUrl("http://localhost:8000"))
        elif ENVIRONMENT == 'development':
            self.load(QUrl("http://localhost:3000"))
        else:
            raise Exception(f"Unknown environment configuration: {ENVIRONMENT}")

        self.show()
        logger.debug(f"PyQt WebEngineView finished loaded")
