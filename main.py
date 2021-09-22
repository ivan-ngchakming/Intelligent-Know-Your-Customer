import sys
import threading
import json

from PyQt5.Qt import QUrl
from PyQt5.QtCore import pyqtSlot
from PyQt5.QtWidgets import QApplication
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtWebEngineWidgets import QWebEngineView

from serve_react import serve


ENVIRONMENT = 'development'


class HelloWorldHtmlApp(QWebEngineView):

    def __init__(self):
        super().__init__()

        if ENVIRONMENT == 'production':
            self.load(QUrl("http://localhost:8000"))
        elif ENVIRONMENT == 'development':
            self.load(QUrl("http://localhost:3000"))
        else:
            raise Exception(f"Unknown environment configuration: {ENVIRONMENT}")

        # # setup channel
        self.channel = QWebChannel()
        self.channel.registerObject('backend', self)
        self.page().setWebChannel(self.channel)

        self.show()

    @pyqtSlot(str, int, str, result=str)
    def foo(self, mystr, myint, myobjectjson):
        print('bar', mystr, myint)
        myobject = json.loads(myobjectjson)

        print('My Object')
        for k in myobject:
            print(k,':', myobject[k])
        return mystr


if __name__ == "__main__":

    if ENVIRONMENT == 'production':
        react = threading.Thread(target=serve, daemon=True)
        react.start()

    app = QApplication(sys.argv)
    view = HelloWorldHtmlApp()
    view.show()

    # Run Application
    sys.exit(app.exec_())
