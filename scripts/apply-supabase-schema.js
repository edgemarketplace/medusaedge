#!/usr/bin/env node

/**
 * Apply Supabase Schema
 * 
 * Usage: node scripts/apply-supabase-schema.js [service-role-key]
 * 
 * Or set SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

const https = require('https');

const SUPABASE_URL = 'https://nzxedlagqtzadyrmgkhq.supabase.co';
const SCHEMA_SQL = require('fs').readFileSync(
  require('path').join(__dirname, '../supabase-schema.sql'), 
  'utf8'
);

async function applySchema(serviceRoleKey) {
  console.log('🚀 Applying Edge Marketplace Hub schema to Supabase...\n');

  const sql = `
    -- Execute schema SQL
    ${SCHEMA_SQL}
  `;

  const postData = JSON.stringify({
    query: sql
  });

  const options = {
    hostname: 'nzxedlagqtzadyrmgkhq.supabase.co',
    path: '/pg',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${serviceRoleKey}`,
      'apikey': serviceRoleKey,
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Response:', data);
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log('\n✅ Schema applied successfully!');
          resolve(data);
        } else {
          reject(new Error(`Failed: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Get service role key from args or env
const serviceRoleKey = process.argv[2] || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error(`
❌ Error: Service role key required!

Usage:
  node scripts/apply-supabase-schema.js <service-role-key>
  
Or add to .env.local:
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

Get your service role key from:
  https://supabase.com/dashboard/project/nzxedlagqtzadyrmgkhq/settings/api
  `);
  process.exit(1);
}

applySchema(serviceRoleKey).catch(err => {
  console.error('❌ Failed to apply schema:', err.message);
  process.exit(1);
});
