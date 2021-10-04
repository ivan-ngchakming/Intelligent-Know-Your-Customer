import logging

from .foo import *
from .auth import *
from .transactions import *
from server.utils.logging import get_console_handler

logger = logging.getLogger(__name__)
logger.addHandler(get_console_handler())
