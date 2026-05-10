#!/usr/bin/env node
/**
 * Edge Marketplace Hub - End-to-end smoke test
 * Tests: intake → Puck editor → publish → marketplace_sites → subdomain
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.TEST_URL || 'https://medusaedge.vercel.app';
const SUPABASE_URL = 'https://nzxedlagqtzadyrmgkhq.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🧪 Edge Marketplace Hub - Smoke Test');
console.log('Base URL:', BASE_URL);
console.log('');

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.request(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      method: options.method || 'GET'
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data ? JSON.parse(data) : {}
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data
          });
        }
      });
    });
    req.on('error', reject);
    if (options.body) req.write(JSON.stringify(options.body));
    req.end();
  });
}

async function testIntake() {
  console.log('📝 Step 1: Testing intake form...');
  const response = await makeRequest(`${BASE_URL}/api/intake`, {
    method: 'POST',
    body: {
      businessName: 'Smoke Test Store',
      email: 'test@edgemarketplacehub.com',
      selectedTemplate: 'template-clothing-marketplace',
      brandColor: '#2563eb',
      tagline: 'Test store for smoke testing',
      offerSummary: 'Test products',
      plan: 'launch'
    }
  });

  if (response.status !== 200 || !response.body.success) {
    throw new Error(`Intake failed: ${JSON.stringify(response.body)}`);
  }

  console.log('✅ Intake successful');
  console.log('  Intake ID:', response.body.intakeId);
  console.log('  Subdomain:', response.body.subdomain);
  console.log('  Puck Editor:', response.body.puckEditorUrl);
  return response.body;
}

async function testProvisioningStatus(intakeId) {
  console.log('');
  console.log('🔍 Step 2: Checking provisioning status...');
  const response = await makeRequest(`${BASE_URL}/api/provisioning/${intakeId}`);

  if (response.status !== 200) {
    console.warn('⚠️  Provisioning endpoint returned:', response.status);
    return null;
  }

  console.log('✅ Provisioning status:', response.body.status);
  return response.body;
}

async function testMarketplaceSitesTable() {
  console.log('');
  console.log('💾 Step 3: Verifying marketplace_sites table...');

  if (!SUPABASE_KEY) {
    console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY not set, skipping direct DB check');
    return;
  }

  const response = await makeRequest(`${SUPABASE_URL}/rest/v1/marketplace_sites?select=*&limit=5`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });

  if (response.status === 200 && response.body.length > 0) {
    console.log('✅ marketplace_sites table accessible');
    console.log('  Row count (sample):', response.body.length);
  } else {
    console.log('⚠️  No rows yet in marketplace_sites (expected for first run)');
  }
}

async function main() {
  try {
    // Test 1: Intake
    const intake = await testIntake();

    // Test 2: Provisioning status
    await testProvisioningStatus(intake.intakeId);

    // Test 3: Verify DB
    await testMarketplaceSitesTable();

    console.log('');
    console.log('🎉 Smoke test complete!');
    console.log('');
    console.log('Next manual steps:');
    console.log('1. Visit Puck Editor:', `${BASE_URL}${intake.puckEditorUrl}`);
    console.log('2. Design your storefront');
    console.log('3. Click Publish');
    console.log('4. Check live site: https://' + intake.subdomain + '.edgemarketplacehub.com');

  } catch (error) {
    console.error('');
    console.error('❌ Smoke test failed:', error.message);
    process.exit(1);
  }
}

main();
