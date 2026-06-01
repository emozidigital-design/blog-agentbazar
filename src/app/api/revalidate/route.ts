import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

// POST /api/revalidate?secret=<REVALIDATE_SECRET>&slug=<slug>
// Pass slug=<post-slug> to revalidate that post page + the homepage.
// Omit slug (or pass slug=*) to revalidate the homepage only.
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/')

  if (slug && slug !== '*') {
    revalidatePath(`/${slug}`)
    return NextResponse.json({ revalidated: ['/', `/${slug}`] })
  }

  return NextResponse.json({ revalidated: ['/'] })
}
