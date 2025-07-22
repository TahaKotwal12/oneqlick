import re
import json
import pytz
from app.api.schemas.project_dashboard import DateRange
from dateutil import parser



def parse_date_range(date_filter):
    """
    Parse a date filter in various formats into a DateRange object.
    
    Parameters:
    -----------
    date_filter : str, dict, or None
        The date filter to parse. Can be:
        - None (returns None)
        - A dictionary (validated directly)
        - A JSON string with properly quoted keys
        - A JSON string with unquoted keys
        - A JSON string with escaped quotes
        - A double-quoted JSON string with escaped quotes inside
    
    Returns:
    --------
    DateRange or None
        The parsed DateRange object, or None if the input was None or parsing failed.
    """
    if date_filter is None:
        return None
        
    try:
        if isinstance(date_filter, str):
            # First, try to clean up the string
            cleaned_str = date_filter.strip()
            
            # Remove outer quotes if they exist
            if cleaned_str.startswith('"') and cleaned_str.endswith('"'):
                cleaned_str = cleaned_str[1:-1]
            
            # Handle escaped quotes
            if '\\\"' in cleaned_str or '\\"' in cleaned_str:
                cleaned_str = cleaned_str.replace('\\\"', '"').replace('\\"', '"')
            
            # Try to parse as proper JSON first
            try:
                data = json.loads(cleaned_str)
                return DateRange.model_validate(data)
            except json.JSONDecodeError:
                # If JSON parsing fails, try to fix unquoted keys
                # Look for pattern: word followed by colon (unquoted keys)
                fixed_json = re.sub(r'(\w+):', r'"\1":', cleaned_str)
                try:
                    data = json.loads(fixed_json)
                    return DateRange.model_validate(data)
                except json.JSONDecodeError:
                    # Last resort: try pydantic's model_validate_json
                    return DateRange.model_validate_json(cleaned_str)
                    
        elif isinstance(date_filter, dict):
            # Handle case where date_filter is already a dictionary
            return DateRange.model_validate(date_filter)
            
    except Exception as e:
        # Log the error for debugging
        print(f"Error parsing date_filter: {e}")
        print(f"Original date_filter: {date_filter}")
        print(f"Type: {type(date_filter)}")
        
        # Try one more approach - extract dates using regex
        try:
            if isinstance(date_filter, str):
                # Extract ISO date patterns
                date_pattern = r'(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z)'
                dates = re.findall(date_pattern, date_filter)
                if len(dates) == 2:
                    return DateRange(from_date=dates[0], to=dates[1])
        except:
            pass
    
    return None


def parse_date_range_utc(date_range: str):
    pattern = r'(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z)'
    match = re.match(pattern, date_range)
    if not match:
        raise ValueError(f"Invalid date range format. Expected format: '2025-05-17T22:49:01Z' or '2025-05-17T22:49:01.000Z'")
        
    datetime_str = match.group(1)

    datetime = parser.isoparse(datetime_str)
    if datetime.tzinfo is not None:
        datetime = datetime.astimezone(pytz.UTC).replace(tzinfo=None)
    
    return datetime.strftime('%Y-%m-%d %H:%M:%S')

