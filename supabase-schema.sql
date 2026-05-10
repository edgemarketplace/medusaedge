-- Edge Marketplace Hub - Complete Database Schema
-- Run this in Supabase SQL Editor: https://nzxedlagqtzadyrmgkhq.supabase.co/project/sql

-- 1. MARKETPLACE_INTAKES (already exists, but let's ensure proper schema)
CREATE TABLE IF NOT EXISTS marketplace_intakes (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Intake fields
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  website TEXT,
  
  -- Template selection
  template_id TEXT NOT NULL,
  template_name TEXT,
  template_data JSONB,
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'provisioning', 'live', 'cancelled')),
  
  -- Provisioning details
  subdomain TEXT UNIQUE,
  deployment_url TEXT,
  medusa_store_id TEXT,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS (Row Level Security)
ALTER TABLE marketplace_intakes ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for intake form)
CREATE POLICY IF NOT EXISTS "Allow public inserts" ON marketplace_intakes
  FOR INSERT WITH CHECK (true);

-- Allow authenticated reads
CREATE POLICY IF NOT EXISTS "Allow authenticated reads" ON marketplace_intakes
  FOR SELECT USING (auth.role() = 'authenticated');

-- 2. MARKETPLACE_SITES (provisioned sites)
CREATE TABLE IF NOT EXISTS marketplace_sites (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Link to intake
  intake_id BIGINT REFERENCES marketplace_intakes(id) ON DELETE CASCADE,
  
  -- Site details
  subdomain TEXT UNIQUE NOT NULL,
  full_url TEXT GENERATED ALWAYS AS ('https://' || subdomain || '.edgemarketplacehub.com') STORED,
  
  -- Puck editor data (JSON structure from Puck publish)
  puck_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Theme and template
  theme_name TEXT DEFAULT 'luxury-fashion',
  template_id TEXT,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'suspended', 'archived')),
  
  -- Published content (rendered HTML or React component tree)
  published_content JSONB DEFAULT '{}'::jsonb,
  
  -- Custom domain (optional)
  custom_domain TEXT UNIQUE
);

ALTER TABLE marketplace_sites ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow public reads for active sites" ON marketplace_sites
  FOR SELECT USING (status = 'active');

-- 3. INVENTORY (products linked to sites)
CREATE TABLE IF NOT EXISTS marketplace_inventory (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Link to site
  site_id BIGINT REFERENCES marketplace_sites(id) ON DELETE CASCADE,
  
  -- Product details
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  
  -- Medusa product ID (when synced)
  medusa_product_id TEXT,
  
  -- Images (array of URLs)
  images TEXT[] DEFAULT '{}',
  
  -- Inventory tracking
  sku TEXT UNIQUE,
  inventory_quantity INT DEFAULT 0,
  allow_backorder BOOLEAN DEFAULT false,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  
  -- Product metadata (category, tags, etc.)
  metadata JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE marketplace_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow public reads for active inventory" ON marketplace_inventory
  FOR SELECT USING (
    status = 'active' AND 
    site_id IN (SELECT id FROM marketplace_sites WHERE status = 'active')
  );

-- 4. ORDERS (Stripe payments)
CREATE TABLE IF NOT EXISTS marketplace_orders (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Link to site
  site_id BIGINT REFERENCES marketplace_sites(id) ON DELETE SET NULL,
  
  -- Stripe payment details
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  
  -- Order details
  total_amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  
  -- Customer info
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  shipping_address JSONB,
  
  -- Order items (JSON array)
  items JSONB NOT NULL DEFAULT '[]'::jsonb
);

ALTER TABLE marketplace_orders ENABLE ROW LEVEL SECURITY;

-- 5. SUBSCRIPTIONS (marketplace monthly/annual plans)
CREATE TABLE IF NOT EXISTS marketplace_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Link to site
  site_id BIGINT REFERENCES marketplace_sites(id) ON DELETE CASCADE,
  
  -- Stripe subscription details
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  
  -- Plan details
  plan_name TEXT NOT NULL CHECK (plan_name IN ('starter', 'professional', 'enterprise')),
  billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'annual')),
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'unpaid')),
  
  -- Dates
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE marketplace_subscriptions ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_marketplace_intakes_status ON marketplace_intakes(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_intakes_subdomain ON marketplace_intakes(subdomain);
CREATE INDEX IF NOT EXISTS idx_marketplace_sites_subdomain ON marketplace_sites(subdomain);
CREATE INDEX IF NOT EXISTS idx_marketplace_sites_status ON marketplace_sites(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_inventory_site_id ON marketplace_inventory(site_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_orders_site_id ON marketplace_orders(site_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_subscriptions_site_id ON marketplace_subscriptions(site_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
DROP TRIGGER IF EXISTS update_marketplace_intakes_updated_at ON marketplace_intakes;
CREATE TRIGGER update_marketplace_intakes_updated_at
  BEFORE UPDATE ON marketplace_intakes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_marketplace_sites_updated_at ON marketplace_sites;
CREATE TRIGGER update_marketplace_sites_updated_at
  BEFORE UPDATE ON marketplace_sites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_marketplace_inventory_updated_at ON marketplace_inventory;
CREATE TRIGGER update_marketplace_inventory_updated_at
  BEFORE UPDATE ON marketplace_inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
-- (This will be replaced by actual intake form submissions)

COMMENT ON TABLE marketplace_intakes IS 'Intake form submissions from launch flow';
COMMENT ON TABLE marketplace_sites IS 'Provisioned marketplace sites with Puck editor data';
COMMENT ON TABLE marketplace_inventory IS 'Product inventory for each marketplace site';
COMMENT ON TABLE marketplace_orders IS 'Orders placed on marketplace sites (Stripe)';
COMMENT ON TABLE marketplace_subscriptions IS 'Subscription plans for marketplace sites';

-- Success message
SELECT 'Edge Marketplace Hub schema created successfully!' AS result;
