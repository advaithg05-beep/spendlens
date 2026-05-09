'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { CheckCircle, AlertTriangle, Zap, ArrowRight } from 'lucide-react'

type ToolEntry = {
  toolId: string
  plan: string
  seats: number
  monthlySpend: number
}

type AuditResult = {
  toolId: string
  toolName: string
  currentSpend: number
  recommendedSpend: number
  savings: number
  action: string
  reason: string
  status: 'overspending' | 'optimal'
}

const TOOL_NAMES: Record<string, string> = {
  cursor: 'Cursor', copilot: 'GitHub Copilot', claude: 'Claude',
  chatgpt: 'ChatGPT', openai: 'OpenAI API', anthropic: 'Anthropic API',
  gemini: 'Gemini', windsurf: 'Windsurf',
}

const OFFICIAL_PRICES: Record<string, Record<string, number>> = {
  cursor: { Hobby: 0, Pro: 20, Business: 40, Enterprise: 40 },
  copilot: { Individual: 10, Business: 19, Enterprise: 39 },
  claude: { Free: 0, Pro: 20, Max: 100, Team: 30, Enterprise: 60, API: 0 },
  chatgpt: { Plus: 20, Team: 30, Enterprise: 60, API: 0 },
  openai: { 'API Direct': 0 },
  anthropic: { 'API Direct': 0 },
  gemini: { Pro: 20, Ultra: 300, API: 0 },
  windsurf: { Free: 0, Pro: 15, Teams: 35 },
}

function runAuditEngine(entries: ToolEntry[], useCase: string): AuditResult[] {
  const results: AuditResult[] = []

  for (const entry of entries) {
    const officialPrice = OFFICIAL_PRICES[entry.toolId]?.[entry.plan] ?? 0
    const expectedSpend = officialPrice * entry.seats
    let savings = 0
    let action = ''
    let reason = ''
    let recommendedSpend = entry.monthlySpend
    let status: 'overspending' | 'optimal' = 'optimal'

    if (entry.monthlySpend > expectedSpend * 1.1 && expectedSpend > 0) {
      savings = entry.monthlySpend - expectedSpend
      recommendedSpend = expectedSpend
      action = `Switch to official ${entry.plan} pricing`
      reason = `You're paying $${entry.monthlySpend}/mo but the official ${entry.plan} plan costs $${expectedSpend}/mo for ${entry.seats} seat(s).`
      status = 'overspending'
    } else if (entry.toolId === 'cursor' && entry.plan === 'Business' && entry.seats <= 2) {
      const proPrice = OFFICIAL_PRICES.cursor.Pro * entry.seats
      savings = expectedSpend - proPrice
      recommendedSpend = proPrice
      action = 'Downgrade to Cursor Pro'
      reason = `With only ${entry.seats} seat(s), Cursor Pro ($20/seat) covers your needs. Business ($40/seat) is for larger teams.`
      status = 'overspending'
    } else if (entry.toolId === 'copilot' && entry.plan === 'Business' && entry.seats <= 2) {
      const indPrice = OFFICIAL_PRICES.copilot.Individual * entry.seats
      savings = expectedSpend - indPrice
      recommendedSpend = indPrice
      action = 'Downgrade to Individual plan'
      reason = `${entry.seats} seat(s) on Copilot Business ($19/seat) can switch to Individual ($10/seat), saving $${savings}/mo.`
      status = 'overspending'
    } else if (entry.toolId === 'claude' && entry.plan === 'Team' && entry.seats <= 2) {
      const proPrice = OFFICIAL_PRICES.claude.Pro * entry.seats
      savings = expectedSpend - proPrice
      recommendedSpend = proPrice
      action = 'Switch to Claude Pro'
      reason = `Team plan suits 5+ users. With ${entry.seats} seat(s), Claude Pro ($20/seat) gives same capability for less.`
      status = 'overspending'
    } else if (entry.toolId === 'gemini' && entry.plan === 'Ultra' && (useCase === 'Writing' || useCase === 'Research')) {
      const proPrice = OFFICIAL_PRICES.gemini.Pro * entry.seats
      savings = expectedSpend - proPrice
      recommendedSpend = proPrice
      action = 'Downgrade to Gemini Pro'
      reason = `For ${useCase}, Gemini Pro covers 95% of Ultra capabilities at $${proPrice}/mo vs $${expectedSpend}/mo.`
      status = 'overspending'
    } else if (entry.monthlySpend > 200 && savings === 0) {
      savings = Math.round(entry.monthlySpend * 0.2)
      recommendedSpend = entry.monthlySpend - savings
      action = 'Buy through Credex credits'
      reason = `At $${entry.monthlySpend}/mo, purchasing discounted credits through Credex saves ~20% on your ${TOOL_NAMES[entry.toolId]} spend.`
      status = 'overspending'
    }

    if (savings === 0) {
      action = 'No change needed'
      reason = `Your ${TOOL_NAMES[entry.toolId]} ${entry.plan} plan is well-matched to your team size and use case.`
      status = 'optimal'
    }

    results.push({
      toolId: entry.toolId,
      toolName: TOOL_NAMES[entry.toolId],
      currentSpend: entry.monthlySpend,
      recommendedSpend,
      savings,
      action,
      reason,
      status,
    })
  }

  return results
}

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<AuditResult[]>([])
  const [mounted, setMounted] = useState(false)
  const [useCase, setUseCase] = useState('')
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const tools = localStorage.getItem('spendlens-tools')
    const step1 = localStorage.getItem('spendlens-step1')
    if (tools && step1) {
      const entries: ToolEntry[] = JSON.parse(tools)
      const { useCase } = JSON.parse(step1)
      setUseCase(useCase)
      setResults(runAuditEngine(entries, useCase))
    }
  }, [])

  if (!mounted) return null

  const totalMonthlySavings = results.reduce((sum, r) => sum + r.savings, 0)
  const totalAnnualSavings = totalMonthlySavings * 12
  const totalCurrentSpend = results.reduce((sum, r) => sum + r.currentSpend, 0)
  const isHighSavings = totalMonthlySavings > 500
  const isOptimal = totalMonthlySavings < 100

  return (
    <main style={{ backgroundColor: '#222222', minHeight: '100vh' }} className="flex flex-col items-center p-8 overflow-hidden relative">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0 opacity-5">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#89E900" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '5%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #89E90018 0%, transparent 70%)' }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i} animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          style={{ position: 'absolute', left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 25}%`, width: 4, height: 4, borderRadius: '50%', backgroundColor: '#89E900', pointerEvents: 'none' }}
        />
      ))}

      {/* Logo */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 relative z-10 mt-6">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <motion.h1
            className="font-black tracking-tighter"
            style={{ fontSize: 42, background: 'linear-gradient(135deg, #89E900 0%, #ffffff 50%, #89E900 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% 200%' }}
            animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            💸 SpendLens
          </motion.h1>
          <motion.div
            style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 3, borderRadius: 999, background: 'linear-gradient(90deg, transparent, #89E900, transparent)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Hero savings card */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="w-full max-w-2xl mb-6 relative z-10">
        <div className="rounded-2xl p-8 text-center" style={{ background: isOptimal ? 'linear-gradient(135deg, #2a2a2a, #1a2a1a)' : 'linear-gradient(135deg, #1a2a0a, #2a3a0a)', border: '1px solid #89E90055', boxShadow: '0 0 60px #89E90022' }}>
          {isOptimal ? (
            <>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }}>
                <CheckCircle size={48} color="#89E900" style={{ margin: '0 auto 16px' }} />
              </motion.div>
              <h2 className="text-3xl font-black mb-2" style={{ color: '#89E900' }}>You're Spending Well! 🎉</h2>
              <p style={{ color: '#ffffff80' }}>Your AI stack is optimized. We'll notify you when better options appear.</p>
            </>
          ) : (
            <>
              <p style={{ color: '#ffffff60', fontSize: 14, letterSpacing: 2, marginBottom: 8 }}>POTENTIAL MONTHLY SAVINGS</p>
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                className="font-black" style={{ fontSize: 72, color: '#89E900', lineHeight: 1, textShadow: '0 0 40px #89E90066' }}
              >
                ${totalMonthlySavings.toLocaleString()}
              </motion.div>
              <p style={{ color: '#ffffff60', fontSize: 18, marginTop: 8 }}>
                = <span style={{ color: '#89E900', fontWeight: 700 }}>${totalAnnualSavings.toLocaleString()}/year</span>
              </p>
              <p style={{ color: '#ffffff40', fontSize: 13, marginTop: 8 }}>out of ${totalCurrentSpend.toLocaleString()}/mo total spend</p>
            </>
          )}
        </div>
      </motion.div>

      {/* Credex CTA */}
      {isHighSavings && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full max-w-2xl mb-6 relative z-10">
          <div className="rounded-xl p-5 flex items-center gap-4" style={{ background: 'linear-gradient(135deg, #89E90022, #89E90011)', border: '1px solid #89E900', boxShadow: '0 0 30px #89E90022' }}>
            <Zap size={32} color="#89E900" />
            <div className="flex-1">
              <p className="font-bold" style={{ color: '#89E900' }}>Capture even more savings with Credex</p>
              <p style={{ color: '#ffffff70', fontSize: 13 }}>Credex sells discounted AI credits — Cursor, Claude, ChatGPT Enterprise. Get up to 30% off retail.</p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: '#89E900', color: '#222', padding: '10px 20px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              Book a Call →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Per tool breakdown */}
      <div className="w-full max-w-2xl relative z-10 space-y-3 mb-6">
        <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ color: '#89E900', fontWeight: 700, letterSpacing: 1, fontSize: 13, marginBottom: 12 }}
        >
          TOOL-BY-TOOL BREAKDOWN
        </motion.h3>

        {results.map((result, i) => (
          <motion.div
            key={result.toolId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ boxShadow: '0 0 30px #89E90022' }}
            className="rounded-xl p-5"
            style={{ backgroundColor: '#2a2a2a', border: `1px solid ${result.status === 'optimal' ? '#ffffff15' : '#89E90033'}`, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {result.status === 'optimal'
                  ? <CheckCircle size={18} color="#89E900" />
                  : <AlertTriangle size={18} color="#ffaa00" />
                }
                <span className="font-bold text-lg" style={{ color: 'white' }}>{result.toolName}</span>
              </div>
              {result.savings > 0 && (
                <span style={{ backgroundColor: '#89E90022', color: '#89E900', padding: '4px 10px', borderRadius: 999, fontSize: 13, fontWeight: 700 }}>
                  Save ${result.savings}/mo
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span style={{ color: '#ffffff60', fontSize: 13 }}>${result.currentSpend}/mo</span>
              {result.savings > 0 && (
                <>
                  <ArrowRight size={14} color="#ffffff40" />
                  <span style={{ color: '#89E900', fontSize: 13, fontWeight: 700 }}>${result.recommendedSpend}/mo</span>
                </>
              )}
            </div>

            <p style={{ color: '#ffffff50', fontSize: 13, lineHeight: 1.6 }}>{result.reason}</p>

            <div className="mt-3 pt-3" style={{ borderTop: '1px solid #ffffff10' }}>
              <span style={{ color: '#89E900', fontSize: 12, fontWeight: 600 }}>→ {result.action}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Save Report Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="w-full max-w-2xl relative z-10 mb-4">
        <motion.button
          onClick={() => setShowEmailModal(true)}
          whileHover={{ scale: 1.02, boxShadow: '0 0 40px #89E90088' }}
          whileTap={{ scale: 0.98 }}
          style={{ width: '100%', padding: '18px', borderRadius: 12, fontWeight: 800, fontSize: 18, backgroundColor: '#89E900', color: '#222222', border: 'none', cursor: 'pointer', boxShadow: '0 0 30px #89E90055' }}
        >
          📧 Save My Report
        </motion.button>
      </motion.div>

      {/* Start over */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        onClick={() => router.push('/')}
        style={{ color: '#ffffff40', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}
        className="relative z-10 mb-12"
      >
        ← Start over
      </motion.button>

      {/* Email Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: '#000000aa', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              style={{ backgroundColor: '#2a2a2a', border: '1px solid #89E90055', borderRadius: 20, padding: 32, width: '100%', maxWidth: 440, boxShadow: '0 0 60px #89E90033' }}
            >
              {!emailSubmitted ? (
                <>
                  <h3 className="text-2xl font-black mb-2" style={{ color: '#89E900' }}>Get Your Full Report</h3>
                  <p style={{ color: '#ffffff60', fontSize: 14, marginBottom: 24 }}>We'll email you the full audit + notify you when new savings apply to your stack.</p>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#333', color: 'white', border: '1px solid #89E90033', borderRadius: 10, padding: '12px 16px', fontSize: 15, marginBottom: 12, boxSizing: 'border-box' }}
                  />
                  <motion.button
                    onClick={() => { if (email) setEmailSubmitted(true) }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    style={{ width: '100%', padding: '14px', borderRadius: 10, fontWeight: 800, fontSize: 16, backgroundColor: '#89E900', color: '#222', border: 'none', cursor: 'pointer', marginBottom: 12 }}
                  >
                    Send My Report →
                  </motion.button>
                  <button onClick={() => setShowEmailModal(false)} style={{ width: '100%', color: '#ffffff40', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>
                    No thanks
                  </button>
                </>
              ) : (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                  <CheckCircle size={48} color="#89E900" style={{ margin: '0 auto 16px' }} />
                  <h3 className="text-2xl font-black mb-2" style={{ color: '#89E900' }}>Report Sent! 🎉</h3>
                  <p style={{ color: '#ffffff60', fontSize: 14 }}>Check your inbox. We'll be in touch if we find more savings for your stack.</p>
                  <motion.button
                    onClick={() => setShowEmailModal(false)}
                    whileHover={{ scale: 1.02 }}
                    style={{ marginTop: 20, padding: '12px 24px', borderRadius: 10, fontWeight: 700, backgroundColor: '#89E900', color: '#222', border: 'none', cursor: 'pointer' }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}