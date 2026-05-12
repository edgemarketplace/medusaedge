/**
 * Inventory table migration
 * Stores products/services for each site
 */

CREATE TABLE IF NOT EXISTS inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id TEXT NOT NULL,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  image TEXT,
  category TEXT,
  sku TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for querying by site_id
CREATE INDEX IF NOT EXISTS idx_inventory_site_id ON inventory(site_id);
CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category);

-- RLS
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Allow service role full access" ON inventory
  FOR ALL USING (auth.role() = 'service_role');

-- Allow public to read (for storefront display)
CREATE POLICY "Allow public read" ON inventory
  FOR SELECT USING (true);

COMMENT ON TABLE inventory IS 'Stores products and services for each site';
