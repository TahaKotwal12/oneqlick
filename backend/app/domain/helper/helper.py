import json


def filter_json_merge(json1_str: str, json2_str: str) -> str:
    """Smart merge of two JSON strings based on key, clickhouse_column, and type matching"""
    try:
        if not json1_str:
            return json2_str if json2_str else "[]"
        if not json2_str:
            return json1_str
        
        json1 = json.loads(json1_str)
        json2 = json.loads(json2_str)
        
        if not isinstance(json1, list) or not isinstance(json2, list):
            raise ValueError("Both inputs must be JSON arrays")
        
        merged_json = []
        
        # Add all items from json2 first
        merged_json.extend(json2)
        
        # Check each item from json1
        for item1 in json1:
            if not item1 or not isinstance(item1, dict) or len(item1) == 0:
                continue
            
            # Check if this item1 has the same key, clickhouse_column, and type as any item in json2
            has_duplicate = False
            for item2 in json2:
                if (item2 and isinstance(item2, dict) and 
                    item1.get('key') == item2.get('key') and 
                    item1.get('clickhouse_column') == item2.get('clickhouse_column') and 
                    item1.get('type') == item2.get('type')):
                    has_duplicate = True
                    break
            
            # If no duplicate found, add the item from json1
            if not has_duplicate:
                merged_json.append(item1)
        
        return json.dumps(merged_json)
    except Exception as e:
        # logger.error(ERROR_MERGING_JSON.format(error=e))
        return f"Error merging JSON: {str(e)}"