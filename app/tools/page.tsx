'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const TOOLS = [
  { id: 'cursor', name: 'Cursor', plans: ['Hobby', 'Pro', 'Business', 'Enterprise'] },
  { id: 'copilot', name: 'GitHub Copilot', plans: ['Individual', 'Business', 'Enterprise'] },
  { id: 'claude', name: 'Claude', plans: ['Free', 'Pro', 'Max', 'Team', 'Enterprise', 'API'] },
  { id: 'chatgpt', name: 'ChatGPT', plans: ['Plus', 'Team', 'Enterprise', 'API'] },
  { id: 'openai', name: 'OpenAI API', plans: ['API Direct'] },
  { id: 'anthropic', name: 'Anthropic API', plans: ['API Direct'] },
  { id: 'gemini', name: 'Gemini', plans: ['Pro', 'Ultra', 'API'] },
  { id: 'windsurf', name: 'Windsurf', plans: ['Free', 'Pro', 'Teams'] },
]

type ToolEntry = {
  toolId: string
  plan: string
  seats: number
  monthlySpend: number
}

export default function ToolsPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<ToolEntry[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('spendlens-tools')
    if (saved) setEntries(JSON.parse(saved))
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem('spendlens-tools', JSON.stringify(entries))
  }, [entries, mounted])

  const addTool = (toolId: string) => {
    if (entries.find(e => e.toolId === toolId)) return
    const tool = TOOLS.find(t => t.id === toolId)!
    setEntries([...entries, { toolId, plan: tool.plans[0], seats: 1, monthlySpend: 0 }])
  }

  const updateEntry = (toolId: string, field: keyof ToolEntry, value: any) => {
    setEntries(entries.map(e => e.toolId === toolId ? { ...e, [field]: value } : e))
  }

  const removeEntry = (toolId: string) => {
    setEntries(entries.filter(e => e.toolId !== toolId))
  }

  const availableTools = TOOLS.filter(t => !entries.find(e => e.toolId === t.id))

  if (!mounted) return null

  return (
    <main style={{ backgroundColor: '#222222', minHeight: '100vh' }} className="flex flex-col items-center p-8 overflow-hidden relative">

      {/* Background grid */}
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
          style={{
            position: 'absolute', top: '5%', left: '5%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, #89E90018 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            position: 'absolute', bottom: '5%', right: '5%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, #89E90010 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          style={{
            position: 'absolute',
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
            width: 4, height: 4, borderRadius: '50%',
            backgroundColor: '#89E900',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 relative z-10 mt-8"
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <motion.h1
            className="font-black tracking-tighter"
            style={{
              fontSize: 52,
              background: 'linear-gradient(135deg, #89E900 0%, #ffffff 50%, #89E900 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              letterSpacing: '-2px',
            }}
            animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            💸 SpendLens
          </motion.h1>
          <motion.div
            style={{
              position: 'absolute', bottom: -4, left: 0, right: 0,
              height: 3, borderRadius: 999,
              background: 'linear-gradient(90deg, transparent, #89E900, transparent)',
            }}
            animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ color: '#ffffff60', marginTop: 12, fontSize: 15 }}
        >
          Step 2 — Add your AI tools
        </motion.p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl mb-6 relative z-10"
      >
        <div className="flex items-center gap-2">
          <div style={{ backgroundColor: '#89E900', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#222' }}>✓</div>
          <div style={{ height: 2, flex: 1, backgroundColor: '#89E900', borderRadius: 999 }} />
          <div style={{ backgroundColor: '#89E900', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#222' }}>2</div>
          <div style={{ height: 2, flex: 1, backgroundColor: '#89E90033', borderRadius: 999 }} />
          <div style={{ backgroundColor: '#89E90033', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#89E900' }}>3</div>
        </div>
        <div className="flex justify-between mt-2" style={{ color: '#ffffff40', fontSize: 11 }}>
          <span>Team Info</span>
          <span style={{ color: '#89E900' }}>AI Tools</span>
          <span>Your Audit</span>
        </div>
      </motion.div>

      {/* Add tool selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-2xl mb-4 relative z-10"
      >
        <div className="rounded-xl p-5" style={{ backgroundColor: '#2a2a2a', border: '1px solid #89E90033', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          <p className="text-sm font-semibold mb-3" style={{ color: '#89E900', letterSpacing: 1 }}>+ ADD AN AI TOOL</p>
          <div className="grid grid-cols-4 gap-2">
            {availableTools.map((tool, i) => (
              <motion.button
                key={tool.id}
                onClick={() => addTool(tool.id)}
                whileHover={{ scale: 1.05, backgroundColor: '#89E90022', borderColor: '#89E900' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  backgroundColor: '#333',
                  border: '1px solid #89E90033',
                  color: '#ffffff90',
                  padding: '10px 8px',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                + {tool.name}
              </motion.button>
            ))}
            {availableTools.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#89E900', fontSize: 13 }}
                className="col-span-4"
              >
                ✓ All tools added!
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tool entries */}
      <div className="w-full max-w-2xl relative z-10 space-y-3">
        <AnimatePresence>
          {entries.map((entry) => {
            const tool = TOOLS.find(t => t.id === entry.toolId)!
            return (
              <motion.div
                key={entry.toolId}
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ boxShadow: '0 0 30px #89E90022' }}
                className="rounded-xl p-5"
                style={{
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #89E90033',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#89E900', boxShadow: '0 0 8px #89E900' }} />
                    <h3 className="font-bold text-lg" style={{ color: '#89E900' }}>{tool.name}</h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeEntry(entry.toolId)}
                    style={{ color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
                  >✕</motion.button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label style={{ color: '#ffffff60', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>PLAN</label>
                    <select
                      value={entry.plan}
                      onChange={e => updateEntry(entry.toolId, 'plan', e.target.value)}
                      style={{ width: '100%', marginTop: 6, backgroundColor: '#333', color: 'white', border: '1px solid #89E90033', borderRadius: 8, padding: '8px 10px', fontSize: 13, cursor: 'pointer' }}
                    >
                      {tool.plans.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ color: '#ffffff60', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>SEATS</label>
                    <input
                      type="number"
                      min={1}
                      value={entry.seats}
                      onChange={e => updateEntry(entry.toolId, 'seats', Number(e.target.value))}
                      style={{ width: '100%', marginTop: 6, backgroundColor: '#333', color: 'white', border: '1px solid #89E90033', borderRadius: 8, padding: '8px 10px', fontSize: 13 }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#ffffff60', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>MONTHLY ($)</label>
                    <input
                      type="number"
                      min={0}
                      value={entry.monthlySpend}
                      onChange={e => updateEntry(entry.toolId, 'monthlySpend', Number(e.target.value))}
                      style={{ width: '100%', marginTop: 6, backgroundColor: '#333', color: 'white', border: '1px solid #89E90033', borderRadius: 8, padding: '8px 10px', fontSize: 13 }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Run Audit Button */}
      <AnimatePresence>
        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full max-w-2xl mt-6 relative z-10"
          >
            <motion.button
              onClick={() => router.push('/results')}
              whileHover={{ scale: 1.02, boxShadow: '0 0 50px #89E900aa' }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: 12,
                fontWeight: 800,
                fontSize: 18,
                backgroundColor: '#89E900',
                color: '#222222',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 30px #89E90055',
                letterSpacing: 0.5,
              }}
            >
              Run My Audit ⚡
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pb-12" />
    </main>
  )
}