import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pxbqfbbzxxvwthygiihx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YnFmYmJ6eHh2d3RoeWdpaWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDYwNjksImV4cCI6MjA5MTM4MjA2OX0.V8hKF3njtera0ElhWiFqCsu8n1nLPdMs29rFvANJDEI');

const genericFillers = [
    'Enhance operational efficiency through automated ticketing updates',
    'Improve customer satisfaction with real-time flight status notifications',
    'Streamline agency workflows using advanced B2B travel tools',
    'Leverage market insights to provide better travel consulting services',
    'Reduce manual errors with integrated GDS and API solutions',
    'Stay ahead of regulatory changes with proactive industry monitoring',
    'Build client trust through transparent pricing and clear fare rules',
    'Optimize travel routes for better cost-effectiveness and timing',
    'Utilize mobile-first strategies for on-the-go passenger assistance',
    'Implement sustainable travel practices for long-term growth'
];

async function fillAll() {
    console.log('Fetching posts with empty bullets...');
    const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('id, title, content')
        .like('content', '%<li dir="ltr"></li>%');
    
    if (error) {
        console.error('Error:', error.message);
        return;
    }

    console.log(`Found ${posts.length} posts to update.`);

    for (const post of posts) {
        let newContent = post.content;
        const emptyLi = /<li dir="ltr"><\/li>/g;
        let i = 0;
        newContent = newContent.replace(emptyLi, () => {
            const text = genericFillers[i % genericFillers.length];
            i++;
            return `<li dir="ltr"><p dir="ltr"><span>${text}</span></p></li>`;
        });
        
        const { error: updateError } = await supabase
            .from('blog_posts')
            .update({ content: newContent })
            .eq('id', post.id);
        
        if (updateError) {
            console.error(`Error updating ${post.title}:`, updateError.message);
        } else {
            process.stdout.write('.');
        }
    }
    console.log('\nAll updates complete.');
}

fillAll();
