'use client';

import { useState, useEffect } from 'react';
import { SPORTS, MARKETS } from '@/lib/sports-config';
import OddsBoard from '@/components/OddsBoard';
import SportSelector from '@/components/SportSelector';
import MarketSelector from '@/components/MarketSelector';

export default function OddsPage({ params }) {
  const [sport, setSport] = useState(params.sport);
  const [market, setMarket] = useState('h2h');
  const [oddsData, setOddsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sportConfig = SPORTS[sport];
  const sportKey = sportConfig?.key || SPORTS.nfl.key;

  useEffect(() => {
    fetchOdds();
  }, [sport, market]);

  async function fetchOdds() {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/odds/${sportKey}?market=${market}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      setOddsData(result.data);
    } catch (err) {
      console.error('Error fetching odds:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              {sportConfig?.name || 'Sports'} Odds & Betting Lines
            </h1>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
              ⚙️ Odds Settings
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <SportSelector currentSport={sport} onSportChange={setSport} />
        </div>
      </div>

      {/* Market Selector & Date */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <MarketSelector currentMarket={market} onMarketChange={setMarket} />
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded">←</button>
              <span className="px-4 py-2 bg-gray-100 rounded font-medium">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
              <button className="p-2 hover:bg-gray-100 rounded">→</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading odds...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <OddsBoard 
            games={oddsData} 
            market={market}
            sport={sport}
          />
        )}
      </div>
    </div>
  );
}
