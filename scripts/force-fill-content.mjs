import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pxbqfbbzxxvwthygiihx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YnFmYmJ6eHh2d3RoeWdpaWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDYwNjksImV4cCI6MjA5MTM4MjA2OX0.V8hKF3njtera0ElhWiFqCsu8n1nLPdMs29rFvANJDEI');

const updates = [
    {
        slug: 'air-india-ahmedabad-terminal-2',
        additions: [
            'All international departures move to Terminal 2',
            'All domestic flights move to Terminal 2',
            'Unified operations for better connectivity',
            'Enhanced lounge and passenger facilities',
            'Faster security and immigration clearance',
            'New check-in counters and baggage systems',
            'Seamless transit between flights',
            'State-of-the-art terminal infrastructure'
        ]
    },
    {
        slug: 'noida-airport-boosts-indiaus-uk-travel-routes',
        additions: [
            'Direct flights to major US hubs like New York and SF',
            'Enhanced connectivity to London and Manchester',
            'State-of-the-art cargo and logistics center',
            'Boost to regional economy and tourism',
            'World-class passenger amenities and tech'
        ]
    }
];

async function run() {
    for (const update of updates) {
        console.log(`Processing ${update.slug}...`);
        const { data: post, error: fetchError } = await supabase
            .from('blog_posts')
            .select('content')
            .eq('slug', update.slug)
            .single();
        
        if (fetchError) {
            console.error(`Fetch error for ${update.slug}:`, fetchError.message);
            continue;
        }

        let content = post.content;
        const emptyLiRegex = /<li dir="ltr">\s*<\/li>/g;
        
        let count = 0;
        const newContent = content.replace(emptyLiRegex, () => {
            const text = update.additions[count % update.additions.length];
            count++;
            return `<li dir="ltr"><p dir="ltr"><span>${text}</span></p></li>`;
        });

        if (count === 0) {
            console.log(`No empty bullets found for ${update.slug}`);
            continue;
        }

        console.log(`Found and replaced ${count} empty bullets in ${update.slug}`);

        const { error: updateError } = await supabase
            .from('blog_posts')
            .update({ content: newContent })
            .eq('slug', update.slug);
        
        if (updateError) {
            console.error(`Update error for ${update.slug}:`, updateError.message);
        } else {
            console.log(`Successfully updated ${update.slug}`);
        }
    }
}

run();
