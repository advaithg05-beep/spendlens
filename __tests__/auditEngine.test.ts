import { describe, it, expect } from 'vitest'

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

const TOOL_NAMES: Record<string, string> = {
  cursor: 'Cursor', copilot: 'GitHub Copilot', claude: 'Claude',
  chatgpt: 'ChatGPT', openai: 'OpenAI API', anthropic: 'Anthropic API',
  gemini: 'Gemini', windsurf: 'Windsurf',
}

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
      reason = `With only ${entry.seats} seat(s), Cursor Pro ($20/seat) covers your needs.`
      status = 'overspending'
    } else if (entry.toolId === 'copilot' && entry.plan === 'Business' && entry.seats <= 2) {
      const indPrice = OFFICIAL_PRICES.copilot.Individual * entry.seats
      savings = expectedSpend - indPrice
      recommendedSpend = indPrice
      action = 'Downgrade to Individual plan'
      reason = `${entry.seats} seat(s) on Copilot Business can switch to Individual, saving $${savings}/mo.`
      status = 'overspending'
    } else if (entry.toolId === 'claude' && entry.plan === 'Team' && entry.seats <= 2) {
      const proPrice = OFFICIAL_PRICES.claude.Pro * entry.seats
      savings = expectedSpend - proPrice
      recommendedSpend = proPrice
      action = 'Switch to Claude Pro'
      reason = `Team plan suits 5+ users. With ${entry.seats} seat(s), Claude Pro gives same capability for less.`
      status = 'overspending'
    } else if (entry.monthlySpend > 200 && savings === 0) {
      savings = Math.round(entry.monthlySpend * 0.2)
      recommendedSpend = entry.monthlySpend - savings
      action = 'Buy through Credex credits'
      reason = `At $${entry.monthlySpend}/mo, purchasing discounted credits through Credex saves ~20%.`
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

describe('Audit Engine', () => {

  it('Test 1 — flags overpaying vs official price', () => {
    const entries: ToolEntry[] = [
      { toolId: 'claude', plan: 'Pro', seats: 1, monthlySpend: 50 }
    ]
    const results = runAuditEngine(entries, 'Coding')
    expect(results[0].savings).toBeGreaterThan(0)
    expect(results[0].status).toBe('overspending')
  })

  it('Test 2 — recommends Cursor Pro over Business for small teams', () => {
    const entries: ToolEntry[] = [
      { toolId: 'cursor', plan: 'Business', seats: 2, monthlySpend: 80 }
    ]
    const results = runAuditEngine(entries, 'Coding')
    expect(results[0].action).toBe('Downgrade to Cursor Pro')
    expect(results[0].savings).toBe(40)
  })

  it('Test 3 — marks optimal spend correctly', () => {
    const entries: ToolEntry[] = [
      { toolId: 'cursor', plan: 'Pro', seats: 1, monthlySpend: 20 }
    ]
    const results = runAuditEngine(entries, 'Coding')
    expect(results[0].savings).toBe(0)
    expect(results[0].status).toBe('optimal')
  })

  it('Test 4 — recommends Claude Pro over Team for small teams', () => {
    const entries: ToolEntry[] = [
      { toolId: 'claude', plan: 'Team', seats: 2, monthlySpend: 60 }
    ]
    const results = runAuditEngine(entries, 'Writing')
    expect(results[0].action).toBe('Switch to Claude Pro')
    expect(results[0].savings).toBeGreaterThan(0)
  })

  it('Test 5 — recommends Credex for high spenders with no other savings', () => {
    const entries: ToolEntry[] = [
      { toolId: 'openai', plan: 'API Direct', seats: 1, monthlySpend: 500 }
    ]
    const results = runAuditEngine(entries, 'Coding')
    expect(results[0].action).toBe('Buy through Credex credits')
    expect(results[0].savings).toBeGreaterThan(0)
  })

})