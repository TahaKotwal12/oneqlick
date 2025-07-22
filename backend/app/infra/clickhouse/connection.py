from clickhouse_connect import get_client as get_clickhouse_client
from app.config.config import CLICKHOUSE_CONFIG
from app.logger.logger import get_logger

logger = get_logger(__name__)

def get_client():
    """
    Create and return a ClickHouse client instance using clickhouse-connect.
    """
    try:
        client = get_clickhouse_client(
            host=CLICKHOUSE_CONFIG["host"],
            port=CLICKHOUSE_CONFIG["port"],
            username=CLICKHOUSE_CONFIG["user"],  # note: clickhouse-connect uses 'username'
            password=CLICKHOUSE_CONFIG["password"],
            database=CLICKHOUSE_CONFIG["database"]
        )
        logger.info("ClickHouse client created successfully using clickhouse-connect.")
        return client
    except Exception as e:
        logger.error("Error creating ClickHouse client: %s", e)
        raise
