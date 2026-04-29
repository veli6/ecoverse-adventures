import { useState, useEffect } from 'react';

const CSV_URL = 'https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_weekly_mlo.csv';

function parseCSV(text) {
  const rows = text
    .split('\n')
    .filter(l => l && !l.startsWith('#'))
    .map(l => l.trim().split(','));

  // columns: year,month,day,decimal,average,ndays,1yr_ago,10yr_ago,increase_since_1800
  const valid = rows.filter(r => r.length >= 8 && parseFloat(r[4]) > 0);
  if (!valid.length) return null;

  const latest = valid[valid.length - 1];
  const latestPpm = parseFloat(latest[4]);
  const yearAgoPpm = parseFloat(latest[6]) > 0 ? parseFloat(latest[6]) : null;
  const tenYearAgoPpm = parseFloat(latest[7]) > 0 ? parseFloat(latest[7]) : null;

  // Sparkline: one reading per year for the last 10 years (pick the May peak — highest of each year)
  const byYear = {};
  valid.forEach(r => {
    const yr = parseInt(r[0]);
    const ppm = parseFloat(r[4]);
    if (!byYear[yr] || ppm > byYear[yr]) byYear[yr] = ppm;
  });
  const currentYear = parseInt(latest[0]);
  const sparkline = [];
  for (let y = currentYear - 9; y <= currentYear; y++) {
    if (byYear[y]) sparkline.push({ year: y, ppm: byYear[y] });
  }

  return {
    latestPpm,
    yearAgoPpm,
    tenYearAgoPpm,
    annualIncrease: yearAgoPpm ? +(latestPpm - yearAgoPpm).toFixed(2) : null,
    decadeIncrease: tenYearAgoPpm ? +(latestPpm - tenYearAgoPpm).toFixed(2) : null,
    date: `${latest[0]}-${String(latest[1]).padStart(2,'0')}-${String(latest[2]).padStart(2,'0')}`,
    sparkline,
  };
}

export function useCO2Data() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(CSV_URL)
      .then(r => r.text())
      .then(text => {
        if (!cancelled) {
          setData(parseCSV(text));
          setLoading(false);
        }
      })
      .catch(e => {
        if (!cancelled) { setError(e); setLoading(false); }
      });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
