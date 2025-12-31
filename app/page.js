'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  const [picks, setPicks] = useState([])
  const [stats, setStats] = useState({ total: 0, wins: 0, losses: 0, pending: 0, roi: 0, profit: 0 })
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPicks()
    const interval = setInterval(fetchPicks, 30000)
    return () => clearInterval(interval)
  }, [])

  async function fetchPicks() {
    const { data, error } = await supabase
      .from('picks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
    
    if (!error && data) {
      setPicks(data)
      calculateStats(data)
    }
    setLoading(false)
  }

  function calculateStats(allPicks) {
    const completed = allPicks.filter(p => p.result && p.result !== 'pending')
    const wins = completed.filter(p => p.result === 'win').length
    const losses = completed.filter(p => p.result === 'loss').length
    const pending = allPicks.filter(p => !p.result || p.result === 'pending').length
    const totalProfit = completed.reduce((sum, p) => sum + (p.profit || 0), 0)
    const totalRisked = completed.reduce((sum, p) => sum + p.units, 0)
    const roi = totalRisked > 0 ? (totalProfit / totalRisked) * 100 : 0

    setStats({
      total: allPicks.length,
      wins,
      losses,
      pending,
      roi: roi.toFixed(1),
      profit: totalProfit.toFixed(1)
    })
  }

  function handleEmailSignup(e) {
    e.preventDefault()
    alert(`Thanks! We'll email you at ${email}`)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">SBS Picks</h1>
          <p className="text-xl text-gray-400 mb-8">
            Data-driven sports betting picks using sharp market analysis
          </p>
          <form onSubmit={handleEmailSignup} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded bg-gray-800 border border-gray-700"
              required
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold">
              Get Picks
            </button>
          </form>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">Win Rate</div>
            <div className="text-3xl font-bold">
              {stats.wins + stats.losses > 0 ? ((stats.wins / (stats.wins + stats.losses)) * 100).toFixed(1) : 0}%
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">ROI</div>
            <div className="text-3xl font-bold text-green-400">{stats.roi}%</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">Profit</div>
            <div className="text-3xl font-bold text-green-400">+{stats.profit}u</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">Record</div>
            <div className="text-3xl font-bold">{stats.wins}-{stats.losses}</div>
            <div className="text-sm text-gray-400 mt-1">{stats.pending} pending</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Picks</h2>
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading picks...</div>
          ) : picks.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No picks yet</div>
          ) : (
            <div className="space-y-4">
              {picks.map((pick) => (
                <div key={pick.id} className="border border-gray-700 rounded-lg p-4 hover:border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-lg">{pick.home_team} vs {pick.away_team}</div>
                      <div className="text-gray-400 text-sm">{pick.sport}</div>
                    </div>
                    {pick.result ? (
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        pick.result === 'win' ? 'bg-green-900 text-green-300' :
                        pick.result === 'loss' ? 'bg-red-900 text-red-300' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {pick.result.toUpperCase()}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded text-sm font-semibold bg-yellow-900 text-yellow-300">
                        PENDING
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-blue-400 font-semibold">{pick.pick} {pick.odds}</span>
                    <span className="text-gray-400">{pick.units}u on {pick.bookmaker}</span>
                    <span className="text-gray-500">{pick.ev_percent}% EV</span>
                  </div>
                  {pick.profit && (
                    <div className={`mt-2 text-sm font-semibold ${pick.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {pick.profit > 0 ? '+' : ''}{pick.profit}u
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Join our Discord: discord.gg/GMPXUEMT</p>
        </footer>
      </div>
    </div>
  )
}
