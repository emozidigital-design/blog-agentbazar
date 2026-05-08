import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pxbqfbbzxxvwthygiihx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YnFmYmJ6eHh2d3RoeWdpaWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDYwNjksImV4cCI6MjA5MTM4MjA2OX0.V8hKF3njtera0ElhWiFqCsu8n1nLPdMs29rFvANJDEI');

async function check() {
    const { data, error, count, status } = await supabase
        .from('blog_posts')
        .update({ content: 'TEST UPDATE' })
        .eq('slug', 'air-india-ahmedabad-terminal-2')
        .select();
    
    console.log('Status:', status);
    console.log('Error:', error);
    console.log('Data:', data);
}

check();
