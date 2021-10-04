import os
import logging

from PyQt5.Qt import QUrl
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage

from server.api import Foo, Transactions, Auth
from server.utils.logging import get_console_handler

logger = logging.getLogger(__name__)
logger.addHandler(get_console_handler())

ENVIRONMENT = os.environ['ENVIRONMENT']


class WebEngineView(QWebEngineView):
    def __init__(self, parent=None):
        super().__init__()
        self.parent = parent

        logger.debug(f"Loading react app in {ENVIRONMENT} mode")
        if ENVIRONMENT == 'production':
            self.load(QUrl("http://localhost:8000"))
        elif ENVIRONMENT == 'development':
            self.load(QUrl("http://localhost:3000"))
        else:
            raise Exception(f"Unknown environment configuration: {ENVIRONMENT}")

        self.loadFinished.connect(self.onLoad)

        # setup channel
        logger.debug("Setting up channels")
        self.channel = QWebChannel()
        self.channel.registerObject('auth', Auth(self))
        self.channel.registerObject('transactions', Transactions(self))
        self.channel.registerObject('foo', Foo(self))
        self.page().setWebChannel(self.channel)
        self.page().featurePermissionRequested.connect(self.onFeaturePermissionRequested)

    def onFeaturePermissionRequested(self, securityOrigin, feature):
        self.sender().setFeaturePermission(
            securityOrigin,
            feature,
            QWebEnginePage.PermissionGrantedByUser
        )

    def onLoad(self):
        logger.debug(f"PyQt WebEngineView finished loaded")
        self.parent.setCurrentWidget(self)


class Loader(QWebEngineView):
    def __init__(self, parent=None):
        super().__init__(parent)

        with open('public/loader.html', 'r') as f:
            self.setHtml(f.read())
