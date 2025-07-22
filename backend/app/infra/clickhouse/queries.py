from app.infra.clickhouse.connection import get_client
from app.logger.logger import get_logger

logger = get_logger(__name__)

def fetch_data(query: str, params: dict = None):
    """
    Execute a SELECT query and return the results using clickhouse-connect.
    
    Args:
        query: SQL query to execute
        params: Query parameters for parameterized queries
        
    Returns:
        Tuple of (rows, columns)
        
    Raises:
        RuntimeError: If query execution fails
    """
    client = get_client()
    try:
        # Remove trailing semicolons to prevent multi-statement errors
        query = query.strip().rstrip(';')
        
        logger.debug(f"Executing ClickHouse query: {query}")
        
        # Execute the query with optional parameters
        result = client.query(query, parameters=params or {})
        
        # Extract the rows and column names from the QueryResult
        rows = result.result_rows
        columns = result.column_names
        
        logger.debug(f"Query executed successfully. Returned {len(rows)} rows.")
        
        return rows, columns
    except Exception as e:
        error_message = f"Query execution failed: {e}"
        logger.error(error_message)
        raise RuntimeError(error_message)


def validate_syntax(query: str) :
    """
    Validate the SQL syntax of a ClickHouse query using EXPLAIN SYNTAX.

    Args:
        query: The SQL query to validate

    Returns:
        A tuple (is_valid, message)
            - is_valid: True if syntax is valid, False otherwise
            - message: Explanation of validation result
    """
    client = get_client()
    try:
        # Clean up input
        query = query.strip().rstrip(';')

        explain_query = f"EXPLAIN SYNTAX {query}"

        logger.debug(f"Validating ClickHouse query syntax: {query}")

        # This will throw an exception if the syntax is invalid
        client.query(explain_query)

        success_message = None
        return True, success_message

    except Exception as e:
        error_message = f"Syntax validation failed: {e}"
        logger.warning(error_message)
        return False, error_message

