#!/usr/bin/env node

/**
 * Edge Marketplace Hub - Provisioning Runner Test
 *
 * Usage:
 *   node scripts/provision-test.js [intakeId]
 *
 * If intakeId provided, provisions that intake.
 * Otherwise, fetches the most recent 'building' intake from Supabase.
 */

import { runProvisioning } from '../src/lib/provision/provision-runner.js';

const SUPABASE_URL = 'https://nzxedlagqtzadyrmgkhq.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_JWT = process.env.SUPABASE_JWT || process.env.SUPABASE_SERVICE_ROLE_KEY;

async function fetchIntake(intakeId) {
  const url = intakeId
    ? `${SUPABASE_URL}/rest/v1/marketplace_intakes?id=eq.${intakeId}&select=*`
    : `${SUPABASE_URL}/rest/v1/marketplace_intakes?provisioning_status=eq.building&order=created_at.desc&limit=1&select=*`;

  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_JWT,
      Authorization: `Bearer ${SUPABASE_JWT}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch intake: ${await response.text()}`);
  }

  const intakes = await response.json();
  return intakes[0] || null;
}

async function markProvisioningDone(intakeId, status, error = null) {
  const updateData = {
    provisioning_status: status,
    finished_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (error) {
    updateData.last_error = error;
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/marketplace_intakes?id=eq.${intakeId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_JWT,
        Authorization: `Bearer ${SUPABASE_JWT}`,
      },
      body: JSON.stringify(updateData),
    }
  );

  if (!response.ok) {
    console.error('Failed to update intake status:', await response.text());
  }
}

async function main() {
  // Check env vars
  const requiredEnvVars = [
    'GITHUB_TOKEN',
    'GITHUB_OWNER',
    'VERCEL_TOKEN',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];

  const missing = requiredEnvVars.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing.join(', '));
    console.error('');
    console.error('Set them and try again:');
    missing.forEach((v) => console.error(`  export ${v}=your_value`));
    process.exit(1);
  }

  const intakeId = process.argv[2] || null;

  console.log('🔍 Fetching intake...');
  const intake = await fetchIntake(intakeId);

  if (!intake) {
    console.error('❌ No intake found');
    if (!intakeId) {
      console.error('   No intakes with provisioning_status="building" found');
    }
    process.exit(1);
  }

  console.log('📦 Intake found:', {
    id: intake.id,
    businessName: intake.business_name,
    subdomain: intake.subdomain,
    templateRepo: intake.template_id,
  });

  // Transform to expected format
  // templateRepo must be the FULL GitHub path: "owner/repo-name"
  const templateRepos = {
    'template-clothing-marketplace': 'edgemarketplace/template-clothing-marketplace',
    'template-medusa-b2b-marketplace': 'edgemarketplace/template-medusa-b2b-marketplace',
    'template-home-goods-furniture-marketplace': 'edgemarketplace/template-home-goods-furniture-marketplace',
    'template-creator-digital-products-marketplace': 'edgemarketplace/template-creator-digital-products-marketplace',
    'template-home-services-marketplace': 'edgemarketplace/template-home-services-marketplace',
    'template-fitness-coaching-marketplace': 'edgemarketplace/template-fitness-coaching-marketplace',
    'template-beauty-wellness-marketplace': 'edgemarketplace/template-beauty-wellness-marketplace',
    'template-course-education-marketplace': 'edgemarketplace/template-course-education-marketplace',
    'template-diy-maker-marketplace': 'edgemarketplace/template-diy-maker-marketplace',
  };

  const templateId = intake.template_id || 'template-clothing-marketplace';
  const fullRepoPath = templateRepos[templateId] || `edgemarketplace/${templateId}`;

  const provisioningData = {
    id: intake.id,
    businessName: intake.business_name,
    subdomain: intake.subdomain,
    templateRepo: fullRepoPath,
  };

  try {
    console.log('');
    console.log('🚀 Starting provisioning...');
    const result = await runProvisioning(provisioningData);

    console.log('');
    console.log('✅ Provisioning completed!');
    console.log('   Repo:', result.repo?.html_url);
    console.log('   Preview URL:', result.previewUrl);

    await markProvisioningDone(intake.id, 'deployed');
    console.log('');
    console.log('✅ Status updated to "deployed"');
  } catch (error) {
    console.error('');
    console.error('❌ Provisioning failed:', error.message);
    await markProvisioningDone(intake.id, 'failed', error.message);
    process.exit(1);
  }
}

main();
