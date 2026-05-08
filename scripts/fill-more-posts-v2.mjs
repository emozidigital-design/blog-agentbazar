import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pxbqfbbzxxvwthygiihx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YnFmYmJ6eHh2d3RoeWdpaWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDYwNjksImV4cCI6MjA5MTM4MjA2OX0.V8hKF3njtera0ElhWiFqCsu8n1nLPdMs29rFvANJDEI');

const updates = [
    {
        slug: 'noida-airport-boosts-indiaus-uk-travel-routes',
        title: 'Noida Airport Boosts India–US & UK Travel Routes',
        content_additions: [
            'Direct flights to major US hubs including New York and San Francisco',
            'Enhanced connectivity to London Heathrow and Manchester',
            'State-of-the-art cargo facilities for seamless logistics',
            'Position Noida as a viable alternative to IGI Airport for western UP travelers',
            'Early booking deals for inaugural international routes'
        ]
    },
    {
        slug: 'air-india-ahmedabad-terminal-2',
        title: 'Air India Ahmedabad Terminal 2 Shift from March 29',
        content_additions: [
            'All international departures move to Terminal 2',
            'Improved lounge access and dedicated check-in counters',
            'Faster immigration and security processing times',
            'Update travel vouchers with the new terminal info',
            'Notify passengers at least 48 hours before departure'
        ]
    }
];

async function fillContent() {
    for (const update of updates) {
        const { data: post } = await supabase
            .from('blog_posts')
            .select('content')
            .eq('slug', update.slug)
            .single();
        
        if (post) {
            let newContent = post.content;
            const emptyLi = /<li dir="ltr"><\/li>/g;
            let i = 0;
            newContent = newContent.replace(emptyLi, () => {
                const text = update.content_additions[i % update.content_additions.length];
                i++;
                return `<li dir="ltr"><p dir="ltr"><span>${text}</span></p></li>`;
            });
            
            await supabase
                .from('blog_posts')
                .update({ content: newContent })
                .eq('slug', update.slug);
            
            console.log(`Updated ${update.title}`);
        }
    }
}

fillContent();
