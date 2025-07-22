-- ENSPECT_DEV.events definition

CREATE TABLE IF NOT EXISTS ENSPECT_DEV.events
(

    `event_id` UUID,

    `tenant_id` UInt32,

    `event` LowCardinality(String) COMMENT 'event values are limited,
 in future can be moved to Enum type',

    `event_type` LowCardinality(String) COMMENT 'event_type is somewhat limited too,
 but can be created numerously under $custom_event',

    `timestamp` DateTime64(6,
 'UTC') COMMENT 'timestamp of event when it occurred',

    `user_id` UUID,

    `$device_id` UUID,

    `$session_id` UUID,

    `$window_id` UUID,

    `app_id` LowCardinality(String) COMMENT 'app_id values are limited',

    `inserted_at` Nullable(DateTime64(6,
 'UTC')) DEFAULT now64() COMMENT 'When inserted in table',

    `created_at` DateTime64(6,
 'UTC') COMMENT 'When data was ingested in queue',

    `event_properties` Map(String,
 String) CODEC(ZSTD(3)),

    `device_properties` Map(String,
 String) CODEC(ZSTD(3)),

    `user_properties` JSON CODEC(ZSTD(3)),

    `additional_properties` String CODEC(ZSTD(3)),

    `geoip_properties` String CODEC(ZSTD(3)),

    `custom_data` String CODEC(ZSTD(3)),

    `custom_field_0` String CODEC(ZSTD(3)),

    `custom_field_1` String CODEC(ZSTD(3)),

    `custom_field_2` String CODEC(ZSTD(3)),

    `custom_field_3` String CODEC(ZSTD(3)),

    `custom_field_4` String CODEC(ZSTD(3)),

    `group0_properties` String CODEC(ZSTD(3)),

    `group1_properties` String CODEC(ZSTD(3)),

    `group2_properties` String CODEC(ZSTD(3)),

    `group3_properties` String CODEC(ZSTD(3)),

    `group4_properties` String CODEC(ZSTD(3)),

    `$city` LowCardinality(String) MATERIALIZED JSONExtractString(geoip_properties,
 '$geoip_city_name'),

    `$country` LowCardinality(String) MATERIALIZED JSONExtractString(geoip_properties,
 '$geoip_country_name')
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(timestamp)
ORDER BY (tenant_id,
 toDate(timestamp),
 event_type,
 cityHash64(toString(user_id)))
SETTINGS index_granularity = 8192;