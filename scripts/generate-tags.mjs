import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://pxbqfbbzxxvwthygiihx.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YnFmYmJ6eHh2d3RoeWdpaWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDYwNjksImV4cCI6MjA5MTM4MjA2OX0.V8hKF3njtera0ElhWiFqCsu8n1nLPdMs29rFvANJDEI'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ─── Tag generator based on title + category ──────────────────────────────────
function generateTags(title, category, content = '') {
  const lower = (title + ' ' + category + ' ' + content.substring(0, 500)).toLowerCase()
  const tags = new Set()

  // ── Category-level base tags ────────────────────────────────────────────────
  const categoryMap = {
    'Aviation':       ['aviation', 'airlines', 'flights'],
    'Visa Updates':   ['visa', 'travel documents', 'immigration'],
    'Travel Tips':    ['travel tips', 'travel guide', 'wanderlust'],
    'Industry News':  ['travel industry', 'tourism news', 'industry updates'],
    'Industry Trends':['travel trends', 'tourism trends', 'industry insights'],
    'Travel Tools':   ['travel tools', 'travel apps', 'trip planning'],
    'Cruise':         ['cruise', 'cruise travel', 'ocean voyages'],
    'Top Sectors':    ['travel sectors', 'tourism', 'travel market'],
    'New Launches':   ['new launches', 'travel innovations', 'product launch'],
    'Events & Expo':  ['travel expo', 'events', 'tourism fair'],
  }
  const baseTags = categoryMap[category] || ['travel', 'tourism']
  baseTags.forEach(t => tags.add(t))

  // ── Keyword-based tags from title ──────────────────────────────────────────
  const keywordRules = [
    [/india|indian/i,            'India travel'],
    [/dgca/i,                    'DGCA'],
    [/railways|irctc|train/i,    'Indian Railways'],
    [/refund|cancellation/i,     'refund policy'],
    [/ticket/i,                  'air ticket'],
    [/passport/i,                'passport'],
    [/visa/i,                    'visa'],
    [/budget|cheap|affordable/i, 'budget travel'],
    [/luxury|premium|business/i, 'luxury travel'],
    [/hotel|resort|stay/i,       'hotels'],
    [/airport/i,                 'airport'],
    [/international/i,           'international travel'],
    [/domestic/i,                'domestic travel'],
    [/2025|2026/i,               '2026 travel'],
    [/europe/i,                  'Europe travel'],
    [/dubai|uae/i,               'Dubai travel'],
    [/singapore/i,               'Singapore travel'],
    [/bali|indonesia/i,          'Bali travel'],
    [/maldives/i,                'Maldives'],
    [/thailand/i,                'Thailand travel'],
    [/usa|america/i,             'USA travel'],
    [/cruise|ship/i,             'cruise travel'],
    [/package|tour/i,            'tour package'],
    [/solo/i,                    'solo travel'],
    [/family/i,                  'family travel'],
    [/honeymoon/i,               'honeymoon'],
    [/backpack/i,                'backpacking'],
    [/agent|travel agent/i,      'travel agent'],
    [/airline|airways/i,         'airline'],
    [/covid|pandemic/i,          'travel health'],
    [/rule|regulation|policy/i,  'travel regulations'],
    [/flight delay|delay/i,      'flight delay'],
    [/baggage|luggage/i,         'baggage policy'],
    [/schengen/i,                'Schengen visa'],
    [/work permit|work visa/i,   'work visa'],
    [/student|study/i,           'study abroad'],
    [/goa/i,                     'Goa'],
    [/kerala/i,                  'Kerala travel'],
    [/himachal|manali|shimla/i,  'Himachal Pradesh'],
    [/rajasthan|jaipur/i,        'Rajasthan travel'],
    [/app|technology|tech/i,     'travel tech'],
    [/insurance/i,               'travel insurance'],
    [/currency|forex/i,          'forex'],
    [/packing|checklist/i,       'packing tips'],
    [/health|safety/i,           'travel safety'],
    [/railway|train|irctc/i,     'train travel'],
    [/bus|road trip/i,           'road trip'],
    [/safari/i,                  'wildlife safari'],
    [/adventure/i,               'adventure travel'],
    [/trekking|hiking/i,         'trekking'],
    [/beach/i,                   'beach vacation'],
    [/mountain/i,                'mountain travel'],
    [/food|cuisine/i,            'food tourism'],
    [/pilgrimage|spiritual/i,    'pilgrimage'],
    [/sustainable|eco/i,         'sustainable travel'],
  ]

  for (const [regex, tag] of keywordRules) {
    if (regex.test(lower) && tags.size < 7) tags.add(tag)
  }

  // Always ensure at least 4 tags
  const extras = ['travel', 'tourism', 'AgentBazar', 'travel news']
  for (const e of extras) {
    if (tags.size >= 5) break
    tags.add(e)
  }

  return [...tags].slice(0, 6)
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('📡 Fetching all blog posts from Supabase...')

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, category, tags, content')
    .order('published_date', { ascending: false })

  if (error) {
    console.error('❌ Error fetching posts:', error.message)
    process.exit(1)
  }

  console.log(`✅ Found ${posts.length} posts\n`)

  let updated = 0
  let skipped = 0

  for (const post of posts) {
    const hasTags = Array.isArray(post.tags) && post.tags.length > 0
    if (hasTags) {
      console.log(`⏭️  SKIP  "${post.title}" — already has tags: [${post.tags.join(', ')}]`)
      skipped++
      continue
    }

    const newTags = generateTags(post.title, post.category, post.content)
    console.log(`🏷️  UPDATE "${post.title}"`)
    console.log(`          Tags: [${newTags.join(', ')}]`)

    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ tags: newTags })
      .eq('id', post.id)

    if (updateError) {
      console.error(`   ❌ Failed: ${updateError.message}`)
    } else {
      console.log(`   ✅ Updated`)
      updated++
    }
  }

  console.log(`\n🎉 Done! Updated: ${updated} | Skipped (already had tags): ${skipped}`)
}

main()
