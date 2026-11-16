const arr = x => (Array.isArray(x) ? x : Object.values(x || {}));

// Mengubah data mentah Firebase menjadi bentuk yang dipakai dashboard
export function toD(r) {
  const T = Array.from({ length: 12 }, () => Array.from({ length: 7 }, () => Array(24).fill(null)));
  arr(r.prediction_lookup.temporal_prob).forEach(x => { T[x.Month - 1][x.DayOfWeek - 1][x.dep_hour] = x.base_delay_prob; });
  for (let m = 0; m < 12; m++) for (let h = 0; h < 24; h++) {
    const v = [0, 1, 2, 3, 4, 5, 6].map(w => T[m][w][h]).filter(x => x != null);
    for (let w = 0; w < 7; w++) if (T[m][w][h] == null && v.length) T[m][w][h] = Math.round(v.reduce((a, b) => a + b) / v.length * 10) / 10;
  }
  return {
    o: r.overview, m: arr(r.rq1_monthly), d: arr(r.rq1_day_of_week), h: arr(r.rq1_hourly), c: arr(r.rq1_carrier),
    cs: arr(r.rq2_cause_summary), rc: arr(r.rq2_cause_by_carrier), e: arr(r.rq3_model_evaluation),
    f: arr(r.rq3_feature_importance), t: T, k: r.prediction_lookup.carrier_multiplier,
  };
}
