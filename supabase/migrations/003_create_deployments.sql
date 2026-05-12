/**
 * Deployments table migration
 * Tracks storefront deployment status
 */

CREATE TABLE IF NOT EXISTS deployments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id TEXT NOT NULL UNIQUE,
  checkout_intent_id UUID REFERENCES checkout_intents(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'deploy_requested', 'queued', 'deploying', 'live', 'failed')),
  deployed_at TIMESTAMP WITH TIME ZONE,
  last_published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for querying
CREATE INDEX IF NOT EXISTS idx_deployments_site_id ON deployments(site_id);
CREATE INDEX IF NOT EXISTS idx_deployments_status ON deployments(status);

-- RLS
ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Allow service role full access" ON deployments
  FOR ALL USING (auth.role() = 'service_role');

-- Allow public to read deployment status (for storefront display)
CREATE POLICY "Allow public read" ON deployments
  FOR SELECT USING (true);

COMMENT ON TABLE deployments IS 'Tracks storefront deployment status and history';
