import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const blogSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const adminSupabase = createClient(
  process.env.ADMIN_SUPABASE_URL!,
  process.env.ADMIN_SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedName = name.trim()

    // Upsert into AgentBazar blog's own lead_list
    const { data: existing } = await blogSupabase
      .from('lead_list')
      .select('id, submission_count')
      .eq('email', normalizedEmail)
      .single()

    if (existing) {
      await blogSupabase
        .from('lead_list')
        .update({ submission_count: existing.submission_count + 1, last_submitted_at: new Date().toISOString(), name: normalizedName })
        .eq('id', existing.id)
    } else {
      await blogSupabase
        .from('lead_list')
        .insert({ name: normalizedName, email: normalizedEmail, source: 'agentbazar-blog' })
    }

    // Dual-write to admin Supabase with client info
    const { data: adminExisting } = await adminSupabase
      .from('lead_list')
      .select('id, submission_count')
      .eq('email', normalizedEmail)
      .eq('client_id', 'agentbazar')
      .single()

    if (adminExisting) {
      await adminSupabase
        .from('lead_list')
        .update({ submission_count: adminExisting.submission_count + 1, last_submitted_at: new Date().toISOString(), name: normalizedName })
        .eq('id', adminExisting.id)
    } else {
      await adminSupabase
        .from('lead_list')
        .insert({ name: normalizedName, email: normalizedEmail, client_id: 'agentbazar', client_name: 'AgentBazar Blog', source: 'agentbazar-blog' })
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
