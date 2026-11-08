# CricInfo+ — Complete Cricket Intelligence Platform
### Combining the Feature Depth of ESPNcricinfo & Cricbuzz

CricInfo+ is a production-quality cricket intelligence platform engineered with feature depth inspired by ESPNcricinfo and Cricbuzz, featuring an original athletic design system, high-density telemetry, and real-time interactive cricket tools.

---

## 🌟 Cricbuzz & ESPNcricinfo Signature Features

### 1. ESPNcricinfo Statguru Query Engine (`StatguruEngine.tsx`)
- Multi-dimensional query builder filtering player & team stats by:
  - **Match Format**: Test, ODI, T20I
  - **Opposition Splits**: vs Australia, England, South Africa, Pakistan, New Zealand
  - **Match Conditions**: Home, Away, Neutral
  - **Match Outcome**: Won, Lost, Drawn / Tied
  - **Innings Phase**: 1st Team Innings, 2nd Team Innings, 4th Innings Chases
- Computes comprehensive query metrics: Innings, Not Outs, Runs, Batting Average, Strike Rate, 100s, 50s, 4s/6s, and Highest Score.

### 2. Cricbuzz Fantasy XI Match Builder (`FantasyXIBuilder.tsx`)
- Interactive fantasy team creation for active matches:
  - **100-Credit Budget Constraint** (players priced from 8.5 to 10.5 credits)
  - **Squad Composition Rules**: 1–2 Wicketkeepers, 3–5 Batters, 1–3 All-rounders, 3–5 Bowlers
  - **Team Limit**: Maximum 7 players from a single nation
  - **Multiplier Assignment**: 2x Captain (C) and 1.5x Vice-Captain (VC) selection
  - **Projected points** calculation and celebratory confetti upon team validation.

### 3. Duckworth-Lewis-Stern (DLS) Target Engine (`DlsCalculator.tsx`)
- Standard Edition DLS rain rule calculator:
  - Set 1st innings total runs, completed overs, and wickets lost.
  - Set revised 2nd innings overs and interruption wickets.
  - Instant recalculation of revised target score, required run rate, and DLS Par Score comparison.

### 4. Cricbuzz Fan Pulse & Match Predictor (`FanPollsPredictor.tsx`)
- Real-time voting on match winner, milestone odds, and next dismissal method.
- Dynamic percentage animations and live vote counters.

### 5. ESPNcricinfo Historical Cup Archives (`HistoricalArchives.tsx`)
- Complete chronicle of ODI World Cup, T20 World Cup, and World Test Championship finals (1975–2026).
- Winners, runners-up, final scorecards, player of the tournament (MVP), and victory margins.

### 6. Sticky Cricbuzz Live Score Bar & Voice Commentary (`StickyLiveScoreTicker.tsx`)
- Floating live score pill across all pages showing real-time match status, current striker/bowler figures, and ball progression.
- **Audio Voice Commentary**: Web Speech API integration that speaks out live ball events (wickets, sixes, boundaries, and scores) like an authentic cricket radio commentator.
- "Auto Stream" and "Simulate Next Ball" triggers accessible anywhere in the app.

### 7. Match Centre Visualizations & Scorecards
- **Worm Chart**: Cumulative progression comparison curves with interactive wicket tooltips.
- **Manhattan Chart**: Over-by-over run rate bars highlighting 10+ run explosive overs.
- **Wagon Wheel**: 360-degree ground shot map showing angle, distance, run value, and zone splits (Off-side vs Leg-side).
- **Recent Balls Strip**: Over-by-over ball results (`W`, `6`, `4`, `1`, `0`).
- **Complete Batting & Bowling Scorecards**: Standard cricket statistics with tabular numerals.

---

## 🛠 Technology Stack
- **Framework**: React 19 SPA on Vite 8
- **Language**: TypeScript with strict types
- **Styling**: Tailwind CSS v4 with dark navy and athletic cricket tokens
- **Audio**: Web Speech Synthesis API
- **Icons**: Lucide React
- **Animations**: Motion & Canvas Confetti
- **Testing**: Vitest unit test suite covering cricket mathematics and rules

---

## 🧪 Testing & Reliability
```bash
npm run test
```
Validates:
- Over-by-over legal ball counting and fractional incrementation.
- Current run rate (CRR) and required run rate (RRR) equations.
- Strike rotation logic (odd runs vs end-of-over changes).
- Batter strike rates and bowler economy calculations.
- Net Run Rate (NRR) tournament standing calculations.
