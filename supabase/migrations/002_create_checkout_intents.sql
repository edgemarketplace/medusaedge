-- Create checkout_intents table for capturing leads/orders
CREATE TABLE IF NOT EXISTS checkout_intents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  product_interest TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for querying by site_id
CREATE INDEX IF NOT EXISTS idx_checkout_intents_site_id ON checkout_intents(site_id);
CREATE INDEX IF NOT EXISTS idx_checkout_intents_status ON checkout_intents(status);
CREATE INDEX IF NOT EXISTS idx_checkout_intents_created_at ON checkout_intents(created_at DESC);

-- RLS (Row Level Security) - allow service role to manage all, public to insert only
ALTER TABLE checkout_intents ENABLE ROW LEVEL SECURITY;

-- Allow public to insert (for checkout form submissions)
CREATE POLICY "Allow public insert" ON checkout_intents
  FOR INSERT WITH CHECK (true);

-- Allow service role full access
CREATE POLICY "Allow service role full access" ON checkout_intents
  FOR ALL USING (auth.role() = 'service_role');

-- Comment
COMMENT ON TABLE checkout_intents IS 'Stores customer checkout intents/leads for follow-up by store owners';
