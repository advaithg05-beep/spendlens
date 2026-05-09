'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Code2, PenLine, BarChart2, Search, Layers } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [teamSize, setTeamSize] = useState('')
  const [useCase, setUseCase] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('spendlens-step1')
    if (saved) {
      const data = JSON.parse(saved)
      setTeamSize(data.teamSize || '')
      setUseCase(data.useCase || '')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('spendlens-step1', JSON.stringify({ teamSize, useCase }))
    }
  }, [teamSize, useCase, mounted])

  if (!mounted) return null

  const useCases = [
    { label: 'Coding', icon: <Code2 size={22} /> },
    { label: 'Writing', icon: <PenLine size={22} /> },
    { label: 'Data', icon: <BarChart2 size={22} /> },
    { label: 'Research', icon: <Search size={22} /> },
    { label: 'Mixed', icon: <Layers size={22} /> },
  ]

  return (
    <main
      style={{ backgroundColor: '#222222', minHeight: '100vh' }}
      className="flex flex-col items-center justify-center p-8 overflow-hidden relative"
    >
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
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          style={{
            position: 'absolute',
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`,
            width: 4, height: 4, borderRadius: '50%',
            backgroundColor: '#89E900',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 relative z-10"
      >
        <motion.span
          animate={{ boxShadow: ['0 0 10px #89E90044', '0 0 25px #89E90088', '0 0 10px #89E90044'] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            backgroundColor: '#89E90015', border: '1px solid #89E90055',
            color: '#89E900', padding: '6px 16px', borderRadius: 999,
            fontSize: 13, fontWeight: 600, letterSpacing: 2,
          }}
        >
          ✦ FREE AI SPEND AUDIT ✦
        </motion.span>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-center mb-10 relative z-10"
      >
        <motion.h1
          className="font-black mb-4 tracking-tighter leading-none"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            background: 'linear-gradient(135deg, #89E900 0%, #ffffff 50%, #89E900 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          SpendLens
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ color: '#ffffff80', fontSize: 20, maxWidth: 500 }}
        >
          Stop guessing. Start saving.{' '}
          <span style={{ color: '#89E900', fontWeight: 700 }}>
            See exactly where your AI budget is leaking.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-8 justify-center mt-6"
        >
          {[
            { value: '$2.4k', label: 'avg monthly waste' },
            { value: '3 min', label: 'to complete audit' },
            { value: '100%', label: 'free forever' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div style={{ color: '#89E900', fontSize: 22, fontWeight: 800 }}>{stat.value}</div>
              <div style={{ color: '#ffffff50', fontSize: 12 }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="rounded-2xl p-8 w-full max-w-lg relative z-10"
        style={{
          backgroundColor: '#2a2a2a',
          border: '1px solid #89E90033',
          boxShadow: '0 0 60px #89E90011, 0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div style={{ backgroundColor: '#89E900', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#222' }}>1</div>
          <div style={{ height: 2, flex: 1, backgroundColor: '#89E90033', borderRadius: 999 }}>
            <motion.div
              style={{ height: '100%', backgroundColor: '#89E900', borderRadius: 999 }}
              initial={{ width: '0%' }}
              animate={{ width: teamSize && useCase ? '100%' : teamSize ? '50%' : '0%' }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div style={{ backgroundColor: '#89E90033', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#89E900' }}>2</div>
        </div>

        <h2 className="text-xl font-bold mb-6" style={{ color: '#ffffff' }}>
          Tell us about your team
        </h2>

        {/* Team Size */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <label className="block text-sm font-semibold mb-3" style={{ color: '#89E900', letterSpacing: 1 }}>
            TEAM SIZE
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: '1', label: 'Just me' },
              { value: '2-5', label: '2–5 people' },
              { value: '6-15', label: '6–15 people' },
              { value: '16-50', label: '16–50 people' },
              { value: '50+', label: '50+ people' },
            ].map((option, i) => (
              <motion.button
                key={option.value}
                onClick={() => setTeamSize(option.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                style={{
                  backgroundColor: teamSize === option.value ? '#89E900' : '#333333',
                  color: teamSize === option.value ? '#222222' : '#ffffff80',
                  border: teamSize === option.value ? '1px solid #89E900' : '1px solid #ffffff15',
                  padding: '10px 8px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: teamSize === option.value ? '0 0 20px #89E90055' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Use Case */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <label className="block text-sm font-semibold mb-3" style={{ color: '#89E900', letterSpacing: 1 }}>
            PRIMARY USE CASE
          </label>
          <div className="grid grid-cols-3 gap-2">
            {useCases.map((uc, i) => (
              <motion.button
                key={uc.label}
                onClick={() => setUseCase(uc.label)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                style={{
                  backgroundColor: useCase === uc.label ? '#89E900' : '#333333',
                  color: useCase === uc.label ? '#222222' : '#ffffff80',
                  border: useCase === uc.label ? '1px solid #89E900' : '1px solid #ffffff15',
                  padding: '12px 8px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: useCase === uc.label ? '0 0 20px #89E90055' : 'none',
                  transition: 'all 0.2s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {uc.icon}
                </div>
                {uc.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          disabled={!teamSize || !useCase}
          onClick={() => { if (teamSize && useCase) router.push('/tools') }}
          whileHover={teamSize && useCase ? { scale: 1.02, boxShadow: '0 0 40px #89E90088' } : {}}
          whileTap={teamSize && useCase ? { scale: 0.98 } : {}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{
            width: '100%', padding: '16px', borderRadius: 12,
            fontWeight: 800, fontSize: 17,
            backgroundColor: teamSize && useCase ? '#89E900' : '#89E90033',
            color: teamSize && useCase ? '#222222' : '#89E90066',
            cursor: teamSize && useCase ? 'pointer' : 'not-allowed',
            boxShadow: teamSize && useCase ? '0 0 30px #89E90055' : 'none',
            border: 'none', transition: 'all 0.3s',
          }}
        >
          {teamSize && useCase ? 'Next: Add Your AI Tools →' : 'Select options above to continue'}
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-8 text-sm relative z-10"
        style={{ color: '#ffffff30' }}
      >
        Powered by <span style={{ color: '#89E90060' }}>Credex</span> · No login required · Free forever
      </motion.p>
    </main>
  )
}