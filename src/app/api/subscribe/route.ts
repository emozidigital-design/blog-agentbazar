import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const AGENTBAZAR_CLIENT_ID = process.env.AGENTBAZAR_CLIENT_ID!
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(req: NextRequest) {
  const blogSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const adminSupabase = createClient(
    process.env.ADMIN_SUPABASE_URL!,
    process.env.ADMIN_SUPABASE_SERVICE_ROLE_KEY!
  )

  async function upsertBlogLead(email: string, name: string) {
    const { data, error } = await blogSupabase
      .from('lead_list')
      .select('id, submission_count')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') throw error

    if (data) {
      const { error: updateError } = await blogSupabase
        .from('lead_list')
        .update({ submission_count: data.submission_count + 1, last_submitted_at: new Date().toISOString(), name })
        .eq('id', data.id)
      if (updateError) throw updateError
    } else {
      const { error: insertError } = await blogSupabase
        .from('lead_list')
        .insert({ name, email, source: 'agentbazar-blog' })
      if (insertError) throw insertError
    }
  }

  async function upsertAdminLead(email: string, name: string) {
    const { data, error } = await adminSupabase
      .from('lead_list')
      .select('id, submission_count')
      .eq('email', email)
      .eq('client_id', AGENTBAZAR_CLIENT_ID)
      .single()

    if (error && error.code !== 'PGRST116') throw error

    if (data) {
      const { error: updateError } = await adminSupabase
        .from('lead_list')
        .update({ submission_count: data.submission_count + 1, last_submitted_at: new Date().toISOString(), name })
        .eq('id', data.id)
      if (updateError) throw updateError
    } else {
      const { error: insertError } = await adminSupabase
        .from('lead_list')
        .insert({ name, email, client_id: AGENTBAZAR_CLIENT_ID, client_name: process.env.AGENTBAZAR_CLIENT_NAME!, source: 'agentbazar-blog' })
      if (insertError) throw insertError
    }
  }

  try {
    const { name, email } = await req.json()

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedName = name.trim()

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address' }, { status: 400 })
    }

    await Promise.all([
      upsertBlogLead(normalizedEmail, normalizedName),
      upsertAdminLead(normalizedEmail, normalizedName),
    ])

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('[subscribe]', err)
    return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
