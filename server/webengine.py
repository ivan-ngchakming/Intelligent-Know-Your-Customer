import os
import logging

from PyQt5.Qt import QUrl
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage

from server.api import Foo, Transactions

logger = logging.getLogger(__name__)

ENVIRONMENT = os.environ['ENVIRONMENT']

class WebEngineView(QWebEngineView):
    def __init__(self):
        super().__init__()

        logger.debug(f"Loading react app in {ENVIRONMENT} mode")
        if ENVIRONMENT == 'production':
            self.load(QUrl("http://localhost:8000"))
        elif ENVIRONMENT == 'development':
            self.load(QUrl("http://localhost:3000"))
        else:
            raise Exception(f"Unknown environment configuration: {ENVIRONMENT}")

        # setup channel
        logger.debug("Setting up channels")
        self.channel = QWebChannel()
        self.channel.registerObject('transactions', Transactions(self))
        self.channel.registerObject('foo', Foo(self))
        self.page().setWebChannel(self.channel)
        self.page().featurePermissionRequested.connect(self.onFeaturePermissionRequested)

        self.show()
        logger.debug(f"PyQt WebEngineView finished loaded")

    def onFeaturePermissionRequested(self, securityOrigin, feature):
        self.sender().setFeaturePermission(
            securityOrigin,
            feature,
            QWebEnginePage.PermissionGrantedByUser
        )
