import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { email, totalMonthlySavings, totalCurrentSpend, useCase, teamSize } = await request.json()

  try {
    await resend.emails.send({
      from: 'SpendLens <onboarding@resend.dev>',
      to: email,
      subject: `Your SpendLens Audit — $${totalMonthlySavings}/mo in savings found`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #222222; color: white; padding: 40px; border-radius: 16px;">
          <h1 style="color: #89E900; font-size: 32px; margin-bottom: 8px;">💸 SpendLens</h1>
          <p style="color: #ffffff80;">Your AI Spend Audit Report</p>
          
          <div style="background: #2a2a2a; border: 1px solid #89E90033; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="color: #ffffff60; font-size: 12px; letter-spacing: 2px;">POTENTIAL MONTHLY SAVINGS</p>
            <p style="color: #89E900; font-size: 48px; font-weight: 900; margin: 8px 0;">$${totalMonthlySavings}</p>
            <p style="color: #ffffff60;">= $${totalMonthlySavings * 12}/year</p>
            <p style="color: #ffffff40; font-size: 12px;">out of $${totalCurrentSpend}/mo total spend</p>
          </div>

          <div style="background: #2a2a2a; border: 1px solid #89E90033; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="color: #ffffff60; font-size: 12px;">Team size: <span style="color: white;">${teamSize}</span></p>
            <p style="color: #ffffff60; font-size: 12px;">Primary use case: <span style="color: white;">${useCase}</span></p>
          </div>

          ${totalMonthlySavings > 500 ? `
          <div style="background: linear-gradient(135deg, #89E90022, #89E90011); border: 1px solid #89E900; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="color: #89E900; font-weight: 700;">Want to capture even more savings?</p>
            <p style="color: #ffffff70; font-size: 13px;">Credex sells discounted AI credits — Cursor, Claude, ChatGPT Enterprise. Get up to 30% off retail pricing.</p>
            <a href="https://credex.ai" style="display: inline-block; background: #89E900; color: #222; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; margin-top: 12px;">Book a Credex Call →</a>
          </div>
          ` : ''}

          <p style="color: #ffffff30; font-size: 12px; margin-top: 32px;">Powered by SpendLens — spendlens-phi.vercel.app</p>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}