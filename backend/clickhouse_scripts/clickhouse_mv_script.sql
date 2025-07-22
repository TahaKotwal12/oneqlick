CREATE TABLE ENSPECT_DEV.events_filter_suggestions_mv_table
(
    `entity` String,
    `tenant_id` UInt32,
    `field_name` String,
    `value` String,
    `unix_time` Int64
    )
ENGINE = ReplacingMergeTree(unix_time)
PARTITION BY tenant_id
ORDER BY (tenant_id, field_name, value)
TTL toDate(unix_time)  + toIntervalDay(90)
SETTINGS index_granularity = 8192;


CREATE MATERIALIZED VIEW IF NOT EXISTS ENSPECT_DEV.events_filter_event_type_mv
TO ENSPECT_DEV.events_filter_suggestions_mv_table
AS
SELECT
    'events' AS entity,
    tenant_id,
    'event_type' AS field_name,
    event_type AS value,
    toUnixTimestamp(max(timestamp)) AS unix_time
FROM ENSPECT_DEV.events
WHERE timestamp >= now() - INTERVAL 7 DAY
  AND event_type != ''
GROUP BY tenant_id, event_type;

CREATE MATERIALIZED VIEW IF NOT EXISTS ENSPECT_DEV.events_filter_event_mv
TO ENSPECT_DEV.events_filter_suggestions_mv_table
AS
SELECT
    'events' AS entity,
    tenant_id,
    'event' AS field_name,
    event AS value,
    toUnixTimestamp(max(timestamp)) AS unix_time
FROM ENSPECT_DEV.events
WHERE timestamp >= now() - INTERVAL 7 DAY
  AND event != ''
GROUP BY tenant_id, event;

CREATE MATERIALIZED VIEW IF NOT EXISTS ENSPECT_DEV.events_filter_element_name_mv
TO ENSPECT_DEV.events_filter_suggestions_mv_table
AS
SELECT
    'events' AS entity,
    tenant_id,
    'element_name' AS field_name,
    event_properties['element_name'] AS value,
    toUnixTimestamp(max(timestamp)) AS unix_time
FROM ENSPECT_DEV.events
WHERE timestamp >= now() - INTERVAL 7 DAY
  AND event_properties['element_name'] != ''
GROUP BY tenant_id, value;

CREATE MATERIALIZED VIEW IF NOT EXISTS ENSPECT_DEV.events_filter_$os_mv
TO ENSPECT_DEV.events_filter_suggestions_mv_table
AS
SELECT
    'events' AS entity,
    tenant_id,
    '$os' AS field_name,
    device_properties['$os'] AS value,
    toUnixTimestamp(max(timestamp)) AS unix_time
FROM ENSPECT_DEV.events
WHERE timestamp >= now() - INTERVAL 7 DAY
  AND device_properties['$os'] != ''
GROUP BY tenant_id, value;

CREATE MATERIALIZED VIEW IF NOT EXISTS ENSPECT_DEV.events_filter_$app_mv
TO ENSPECT_DEV.events_filter_suggestions_mv_table
AS
SELECT
    'events' AS entity,
    tenant_id,
    '$app' AS field_name,
    device_properties['$app'] AS value,
    toUnixTimestamp(max(timestamp)) AS unix_time
FROM ENSPECT_DEV.events
WHERE timestamp >= now() - INTERVAL 7 DAY
  AND device_properties['$app'] != ''
GROUP BY tenant_id, value;

CREATE MATERIALIZED VIEW IF NOT EXISTS ENSPECT_DEV.events_filter_$app_version_mv
TO ENSPECT_DEV.events_filter_suggestions_mv_table
AS
SELECT
    'events' AS entity,
    tenant_id,
    '$app_version' AS field_name,
    device_properties['$app_version'] AS value,
    toUnixTimestamp(max(timestamp)) AS unix_time
FROM ENSPECT_DEV.events
WHERE timestamp >= now() - INTERVAL 7 DAY
  AND device_properties['$app_version'] != ''
GROUP BY tenant_id, value;

CREATE MATERIALIZED VIEW IF NOT EXISTS ENSPECT_DEV.events_filter_$device_type_mv
TO ENSPECT_DEV.events_filter_suggestions_mv_table
AS
SELECT
    'events' AS entity,
    tenant_id,
    '$device_type' AS field_name,
    device_properties['$device_type'] AS value,
    toUnixTimestamp(max(timestamp)) AS unix_time
FROM ENSPECT_DEV.events
WHERE timestamp >= now() - INTERVAL 7 DAY
  AND device_properties['$device_type'] != ''
GROUP BY tenant_id, value;

CREATE MATERIALIZED VIEW IF NOT EXISTS ENSPECT_DEV.events_filter_$app_language_mv
TO ENSPECT_DEV.events_filter_suggestions_mv_table
AS
SELECT
    'events' AS entity,
    tenant_id,
    '$app_language' AS field_name,
    device_properties['$app_language'] AS value,
    toUnixTimestamp(max(timestamp)) AS unix_time
FROM ENSPECT_DEV.events
WHERE timestamp >= now() - INTERVAL 7 DAY
  AND device_properties['$app_language'] != ''
GROUP BY tenant_id, value;

CREATE MATERIALIZED VIEW IF NOT EXISTS ENSPECT_DEV.events_filter_$timezone_mv
TO ENSPECT_DEV.events_filter_suggestions_mv_table
AS
SELECT
    'events' AS entity,
    tenant_id,
    '$timezone' AS field_name,
    device_properties['$timezone'] AS value,
    toUnixTimestamp(max(timestamp)) AS unix_time
FROM ENSPECT_DEV.events
WHERE timestamp >= now() - INTERVAL 7 DAY
  AND device_properties['$timezone'] != ''
GROUP BY tenant_id, value;











