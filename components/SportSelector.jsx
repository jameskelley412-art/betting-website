'use client';

import Link from 'next/link';
import { SPORTS } from '@/lib/sports-config';

export default function SportSelector({ currentSport }) {
  return (
    <div className="flex gap-1 overflow-x-auto py-2">
      {Object.keys(SPORTS).map(sportKey => {
        const sport = SPORTS[sportKey];
        const isActive = currentSport === sportKey;
        
        return (
          <Link
            key={sportKey}
            href={`/odds/${sportKey}`}
            className={`
              px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors
              ${isActive 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {sport.icon} {sport.name}
          </Link>
        );
      })}
    </div>
  );
}
