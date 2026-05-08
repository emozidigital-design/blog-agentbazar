import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pxbqfbbzxxvwthygiihx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YnFmYmJ6eHh2d3RoeWdpaWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDYwNjksImV4cCI6MjA5MTM4MjA2OX0.V8hKF3njtera0ElhWiFqCsu8n1nLPdMs29rFvANJDEI');

async function getTitles() {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('title, slug')
        .like('content', '%<li dir="ltr"></li>%')
        .limit(10);
    
    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log(data.map(p => p.title).join('\n'));
    }
}

getTitles();
