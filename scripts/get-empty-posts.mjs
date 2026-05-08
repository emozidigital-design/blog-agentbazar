import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pxbqfbbzxxvwthygiihx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YnFmYmJ6eHh2d3RoeWdpaWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDYwNjksImV4cCI6MjA5MTM4MjA2OX0.V8hKF3njtera0ElhWiFqCsu8n1nLPdMs29rFvANJDEI');

async function getPosts() {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, content')
        .like('content', '%<li dir="ltr"></li>%')
        .limit(5);
    
    if (error) {
        console.error('Error fetching:', error.message);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
}

getPosts();
