ALTER TABLE store_items
    DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS store_users CASCADE;