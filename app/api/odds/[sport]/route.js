import { NextResponse } from 'next/server';

const ODDS_API_KEY = process.env.ODDS_API_KEY;
const BOOKMAKERS = 'bet365,fanatics,betmgm,williamhill_us,betrivers,fanduel,draftkings,pinnacle';

export async function GET(request, { params }) {
  try {
    const { sport } = params;
    const searchParams = request.nextUrl.searchParams;
    const market = searchParams.get('market') || 'h2h';
    
    const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?` +
      `apiKey=${ODDS_API_KEY}&` +
      `regions=us&` +
      `bookmakers=${BOOKMAKERS}&` +
      `markets=${market}&` +
      `oddsFormat=american`;
    
    console.log('Fetching odds from:', url);
    
    const response = await fetch(url, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Odds API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process the data to format it nicely
    const processedData = data.map(game => {
      const oddsMap = {};
      
      game.bookmakers.forEach(bookmaker => {
        const market = bookmaker.markets[0]; // h2h, spreads, or totals
        if (market) {
          oddsMap[bookmaker.key] = market.outcomes;
        }
      });
      
      return {
        id: game.id,
        sport_key: game.sport_key,
        sport_title: game.sport_title,
        commence_time: game.commence_time,
        home_team: game.home_team,
        away_team: game.away_team,
        bookmakers: oddsMap
      };
    });
    
    return NextResponse.json({
      success: true,
      data: processedData,
      count: processedData.length
    });
    
  } catch (error) {
    console.error('Error fetching odds:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
