import Card from '../components/Card';
import ChartCanvas from '../components/ChartCanvas';
import { K, MN, MS, CC, BORDER, fmt, f1, rate, byRate } from '../utils/helpers';

export default function Ringkasan({ D }) {
  const o = D.o, car = byRate(D.c);
  const mx = D.m.reduce((a, b) => (b['delay_rate_%'] > a['delay_rate_%'] ? b : a));
  const mn = D.m.reduce((a, b) => (b['delay_rate_%'] < a['delay_rate_%'] ? b : a));
  const h = D.h.filter(x => x.flights > 5000);
  const hb = h.reduce((a, b) => (b['delay_rate_%'] < a['delay_rate_%'] ? b : a));
  const hw = h.reduce((a, b) => (b['delay_rate_%'] > a['delay_rate_%'] ? b : a));
  const top = [...D.cs].sort((a, b) => b.total_minutes - a.total_minutes)[0];
  const kpis = [['Total penerbangan', fmt(o.total_flights_clean)], ['Terlambat', fmt(o.total_delayed)], ['Tingkat delay', rate(o.overall_delay_rate_pct)], ['Akurasi model', rate(o.model_accuracy_pct)], ['ROC-AUC', f1(o.model_roc_auc)]];
  const ins = [
    `Bulan terburuk: ${MN[mx.Month - 1]} (${rate(mx['delay_rate_%'])}). Terbaik: ${MN[mn.Month - 1]} (${rate(mn['delay_rate_%'])}).`,
    `Jam teraman: ${hb.dep_hour}:00 (${rate(hb['delay_rate_%'])}). Jam paling rawan: ${hw.dep_hour}:00 (${rate(hw['delay_rate_%'])}).`,
    `Maskapai paling sering terlambat: ${car[0].name} (${rate(car[0]['delay_rate_%'])}). Paling tepat waktu: ${car[car.length - 1].name} (${rate(car[car.length - 1]['delay_rate_%'])}).`,
    `Penyebab terbesar: ${top.cause}, ${f1(top['share_of_minutes_%'])}% dari seluruh menit delay.`,
  ];
  return (
    <>
      <div className="kpis">{kpis.map(([l, v]) => <div className="card kpi" key={l}><div className="big">{v}</div><small>{l}</small></div>)}</div>
      <div className="grid">
        <Card title="Tren delay per bulan" sub="Persentase penerbangan yang terlambat tiap bulan.">
          <ChartCanvas config={{ type: 'line', data: { labels: MS, datasets: [{ label: 'Delay (%)', data: D.m.map(x => x['delay_rate_%']), borderColor: K.cy, backgroundColor: '#38bdf833', fill: true, tension: 0.35, pointRadius: 4, pointHoverRadius: 7 }] }, options: { plugins: { legend: { display: false } }, scales: { y: { ticks: { callback: v => v + '%' } } } } }} />
        </Card>
        <Card title="Penyebab delay" sub="Porsi menit keterlambatan menurut penyebab.">
          <ChartCanvas config={{ type: 'doughnut', data: { labels: D.cs.map(x => x.cause), datasets: [{ data: D.cs.map(x => x['share_of_minutes_%']), backgroundColor: D.cs.map(x => CC[x.cause]), borderColor: BORDER, borderWidth: 3 }] }, options: { cutout: '62%', plugins: { legend: { position: 'bottom' }, tooltip: { callbacks: { label: c => c.label + ': ' + f1(c.raw) + '%' } } } } }} />
        </Card>
      </div>
      <div className="ins">{ins.map((t, i) => <div key={i}>{t}</div>)}</div>
    </>
  );
}
