'use client';

import { MARKETS } from '@/lib/sports-config';

export default function MarketSelector({ currentMarket, onMarketChange }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 bg-white">
      {Object.keys(MARKETS).map(marketKey => {
        const market = MARKETS[marketKey];
        const isActive = currentMarket === marketKey;
        
        return (
          <button
            key={marketKey}
            onClick={() => onMarketChange(marketKey)}
            className={`
              px-4 py-2 font-medium transition-colors
              ${isActive 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-50'
              }
              ${marketKey === 'h2h' ? 'rounded-l-lg' : ''}
              ${marketKey === 'totals' ? 'rounded-r-lg' : ''}
            `}
          >
            {market.name}
          </button>
        );
      })}
    </div>
  );
}
