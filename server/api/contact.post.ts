const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 3

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const now = Date.now()

  const record = rateLimitMap.get(ip)
  if (record && now < record.resetAt) {
    if (record.count >= MAX_REQUESTS) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Too many requests. Please try again later.'
      })
    }
    record.count++
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
  }

  const body = await readBody<{
    name?: string
    email?: string
    message?: string
    website?: string
    startedAt?: number
  }>(event)

  if (body.website?.trim()) {
    return { ok: true }
  }

  if (!body.startedAt || now - body.startedAt < 2000) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid submission.'
    })
  }

  const name = body.name?.trim() || ''
  const email = body.email?.trim() || ''
  const message = body.message?.trim() || ''

  if (!name || name.length > 100) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid name.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 150) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email.' })
  }
  if (!message || message.length < 10 || message.length > 3000) {
    throw createError({ statusCode: 400, statusMessage: 'Message must be between 10 and 3000 characters.' })
  }

  const config = useRuntimeConfig()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['lenuarykontakt@gmail.com'],
      reply_to: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    })
  })

  if (!res.ok) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send message. Please try again later.'
    })
  }

  return { ok: true }
})