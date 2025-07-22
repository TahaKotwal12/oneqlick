from enum import Enum, auto

class Status(str, Enum):
    """
    Status enum for active/inactive records.
    Used in multiple database models including ProjectDashboard, DashboardChartQuery, Chart, and Query.
    """
    ACTIVE = "A"
    INACTIVE = "I"
    DELETED = "D"

class DefaultFlag(str, Enum):
    """
    Flag to indicate if an item is default or not.
    Used in ProjectDashboard model for is_default field.
    """
    YES = "Y"
    NO = "N"

class ChatBy(str, Enum):
    """
    Flag to indicate who has chated either user or 
    """
    AI = "A"
    USER = "U"
    
class QueryCreationMechanism(str, Enum):
    SQL = "SQL"
    AI = "AI"
    BUILDER = "BUILDER"
    RETENTION = "RETENTION"
    FUNNEL = "FUNNEL"
    PATH = "PATH"
    TREND = "TREND"
    
