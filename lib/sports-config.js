export const SPORTS = {
  nfl: {
    key: 'americanfootball_nfl',
    name: 'NFL',
    icon: '🏈',
    useWeeks: true
  },
  ncaaf: {
    key: 'americanfootball_ncaaf',
    name: 'NCAAF',
    icon: '🏈',
    useWeeks: true
  },
  nba: {
    key: 'basketball_nba',
    name: 'NBA',
    icon: '🏀',
    useWeeks: false
  },
  ncaab: {
    key: 'basketball_ncaab',
    name: 'NCAAB',
    icon: '🏀',
    useWeeks: false
  },
  nhl: {
    key: 'icehockey_nhl',
    name: 'NHL',
    icon: '🏒',
    useWeeks: false
  },
  mlb: {
    key: 'baseball_mlb',
    name: 'MLB',
    icon: '⚾',
    useWeeks: false
  },
  soccer: {
    key: 'soccer_epl',
    name: 'Soccer',
    icon: '⚽',
    useWeeks: false,
    leagues: [
      { key: 'soccer_epl', name: 'EPL' },
      { key: 'soccer_spain_la_liga', name: 'La Liga' },
      { key: 'soccer_germany_bundesliga', name: 'Bundesliga' },
      { key: 'soccer_italy_serie_a', name: 'Serie A' },
      { key: 'soccer_france_ligue_one', name: 'Ligue 1' },
      { key: 'soccer_usa_mls', name: 'MLS' },
      { key: 'soccer_uefa_champs_league', name: 'Champions League' },
      { key: 'soccer_mexico_ligamx', name: 'Liga MX' }
    ]
  },
  ufc: {
    key: 'mma_mixed_martial_arts',
    name: 'UFC',
    icon: '🥊',
    useWeeks: false
  },
  tennis: {
    key: 'tennis_atp_aus_open_singles',
    name: 'Tennis',
    icon: '🎾',
    useWeeks: false
  },
  golf: {
    key: 'golf_pga_championship',
    name: 'Golf',
    icon: '⛳',
    useWeeks: false
  },
  wnba: {
    key: 'basketball_wnba',
    name: 'WNBA',
    icon: '🏀',
    useWeeks: false
  }
};

export const BOOKMAKERS = {
  bet365: { name: 'bet365', color: '#1E3A28' },
  fanatics: { name: 'Fanatics', color: '#0033A0' },
  betmgm: { name: 'BetMGM', color: '#C5A572' },
  williamhill_us: { name: 'Caesars', color: '#003087' },
  betrivers: { name: 'BetRivers', color: '#0052A5' },
  fanduel: { name: 'FanDuel', color: '#0E4595' },
  draftkings: { name: 'DraftKings', color: '#53D337' },
  pinnacle: { name: 'Pinnacle', color: '#FF6B00', isSharp: true }
};

export const MARKETS = {
  h2h: { name: 'Moneyline', key: 'h2h' },
  spreads: { name: 'Spread', key: 'spreads' },
  totals: { name: 'Total', key: 'totals' }
};
