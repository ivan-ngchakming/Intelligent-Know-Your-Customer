from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import QMainWindow, QStackedWidget

from .webengine import WebEngineView, Loader


class Window(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowIcon(QIcon(f'public/logo.png'))
        self.setWindowTitle("IKYC")

        self.setCentralWidget(CentralWidget(self))

        self.showMaximized()


class CentralWidget(QStackedWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.parent = parent

        self.addWidget(Loader(self))
        self.addWidget(WebEngineView(self))
