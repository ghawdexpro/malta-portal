import pg from 'pg';
import fs from 'fs';

// Supabase direct connection (not pooler)
// Password needs to be set as env var
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.log('DATABASE_URL not set.');
  console.log('');
  console.log('Get your connection string from Supabase Dashboard:');
  console.log('https://supabase.com/dashboard/project/cegaphmtjasusuzqmvxf/settings/database');
  console.log('');
  console.log('Then run:');
  console.log('DATABASE_URL="postgresql://postgres.cegaphmtjasusuzqmvxf:YOUR_PASSWORD@aws-0-eu-west-1.pooler.supabase.com:5432/postgres" node run-migration.mjs');
  console.log('');
  console.log('Or paste the SQL manually in the SQL Editor:');
  console.log('https://supabase.com/dashboard/project/cegaphmtjasusuzqmvxf/sql/new');
  process.exit(1);
}

const client = new pg.Client({ connectionString });

try {
  await client.connect();
  console.log('Connected to Supabase database');

  const sql = fs.readFileSync('supabase/migrations/001_portal_tables.sql', 'utf8');
  await client.query(sql);
  console.log('✅ All portal tables created successfully');

  // Verify tables
  const { rows } = await client.query(`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name IN ('raw_posts', 'analyzed_posts', 'article_clusters', 'articles', 'maklowicz_stops', 'guides', 'pipeline_jobs', 'admins')
    ORDER BY table_name
  `);
  console.log('\nTables created:');
  rows.forEach(r => console.log(`  ✅ ${r.table_name}`));

  // Show bot API key
  const { rows: admins } = await client.query(`SELECT name, type, api_key FROM admins`);
  console.log('\nAdmin accounts:');
  admins.forEach(a => console.log(`  ${a.type === 'bot' ? '🤖' : '👤'} ${a.name} ${a.api_key ? `(key: ${a.api_key})` : '(no key - uses Supabase Auth)'}`));

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await client.end();
}
