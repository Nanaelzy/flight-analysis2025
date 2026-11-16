import Card from '../components/Card';
import ChartCanvas from '../components/ChartCanvas';
import { CC, BORDER, f1 } from '../utils/helpers';

export default function Penyebab({ D }) {
  const cs = D.cs, nm = Object.fromEntries(D.c.map(x => [x.Reporting_Airline, x.name])), ks = Object.keys(CC);
  return (
    <div className="grid pair-grid">
      <Card title="Total menit delay menurut penyebab" sub="Penyebab terbesar menurut jumlah menit.">
        <ChartCanvas config={{ type: 'doughnut', data: { labels: cs.map(x => x.cause), datasets: [{ data: cs.map(x => x['share_of_minutes_%']), backgroundColor: cs.map(x => CC[x.cause]), borderColor: BORDER, borderWidth: 3 }] }, options: { cutout: '62%', plugins: { legend: { position: 'bottom' }, tooltip: { callbacks: { label: c => c.label + ': ' + f1(c.raw) + '%' } } } } }} />
      </Card>
      <Card title="Penyebab dominan per penerbangan terlambat" sub="Persentase penerbangan terlambat menurut penyebab utamanya.">
        <ChartCanvas config={{ type: 'bar', data: { labels: cs.map(x => x.cause), datasets: [{ label: 'Penyebab dominan (%)', data: cs.map(x => x['share_of_late_flights_%']), backgroundColor: cs.map(x => CC[x.cause]), borderRadius: 8 }] }, options: { plugins: { legend: { display: false } }, scales: { y: { ticks: { callback: v => v + '%' } } } } }} />
      </Card>
      <Card wide title="Komposisi penyebab tiap maskapai" sub="Setiap batang berjumlah 100%.">
        <ChartCanvas tall config={{ type: 'bar', data: { labels: D.rc.map(x => nm[x.Reporting_Airline] || x.Reporting_Airline), datasets: ks.map(k => ({ label: k, data: D.rc.map(x => x[k]), backgroundColor: CC[k] })) }, options: { indexAxis: 'y', scales: { x: { stacked: true, max: 100, ticks: { callback: v => v + '%' } }, y: { stacked: true } }, plugins: { tooltip: { callbacks: { label: c => c.dataset.label + ': ' + f1(c.raw) + '%' } } } } }} />
      </Card>
    </div>
  );
}
