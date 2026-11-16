import Card from '../components/Card';
import ChartCanvas from '../components/ChartCanvas';
import { K, MS } from '../utils/helpers';

export default function Waktu({ D }) {
  const dm = Math.max(...D.d.map(x => x['delay_rate_%']));
  const pct = { ticks: { callback: v => v + '%' } };
  return (
    <div className="grid pair-grid">
      <Card title="Per bulan" sub="Batang: jumlah penerbangan. Garis: persentase delay.">
        <ChartCanvas config={{ type: 'bar', data: { labels: MS, datasets: [
          { type: 'bar', label: 'Penerbangan', data: D.m.map(x => x.flights), backgroundColor: '#a78bfa66', borderRadius: 6, yAxisID: 'y' },
          { type: 'line', label: 'Delay (%)', data: D.m.map(x => x['delay_rate_%']), borderColor: K.am, pointBackgroundColor: K.am, tension: 0.35, pointRadius: 4, pointHoverRadius: 7, yAxisID: 'y1' }] },
          options: { scales: { y: { ticks: { callback: v => v / 1000 + 'rb' } }, y1: { position: 'right', grid: { display: false }, ...pct } } } }} />
      </Card>
      <Card title="Per hari dalam seminggu" sub="Persentase delay, dari Senin sampai Minggu.">
        <ChartCanvas config={{ type: 'bar', data: { labels: D.d.map(x => x.DayOfWeek), datasets: [{ label: 'Delay (%)', data: D.d.map(x => x['delay_rate_%']), backgroundColor: D.d.map(x => (x['delay_rate_%'] === dm ? K.co : K.cy)), borderRadius: 8 }] }, options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ...pct } } } }} />
      </Card>
      <Card wide title="Per jam keberangkatan" sub="Delay menumpuk seiring hari berjalan, karena keterlambatan pagi menular ke penerbangan berikutnya.">
        <ChartCanvas config={{ type: 'line', data: { labels: D.h.map(x => x.dep_hour + ':00'), datasets: [{ label: 'Delay (%)', data: D.h.map(x => x['delay_rate_%']), borderColor: K.co, backgroundColor: '#fb718533', fill: true, tension: 0.35, pointRadius: 3, pointHoverRadius: 7 }] }, options: { interaction: { intersect: false, mode: 'index' }, plugins: { legend: { display: false } }, scales: { y: pct } } }} />
      </Card>
    </div>
  );
}
