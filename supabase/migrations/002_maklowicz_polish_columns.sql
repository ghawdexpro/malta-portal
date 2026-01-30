-- Add Polish translation columns to maklowicz_stops
ALTER TABLE maklowicz_stops ADD COLUMN IF NOT EXISTS description_pl TEXT;
ALTER TABLE maklowicz_stops ADD COLUMN IF NOT EXISTS location_name_pl TEXT;
ALTER TABLE maklowicz_stops ADD COLUMN IF NOT EXISTS episode_pl TEXT;
