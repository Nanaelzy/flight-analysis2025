import { useState } from 'react';
import Card from '../components/Card';
import ChartCanvas from '../components/ChartCanvas';
import { MN, DN, hue, lvl, rate, f1, byRate } from '../utils/helpers';

const Y = 2026;
const dow = (m, d) => (new Date(Y, m, d).getDay() + 6) % 7;

export default function Prediksi({ D }) {
  const now = new Date(), ini = now.getFullYear() === Y;
  const [m, setM] = useState(ini ? now.getMonth() : 10);
  const [d, setD] = useState(ini ? now.getDate() : 15);
  const [c, setC] = useState('');
  const car = byRate(D.c), W = D.h.map(x => x.flights), WM = Math.max(...W), k = c ? D.k[c] : 1;
  const hrs = (mm, dd) => D.t[mm][dow(mm, dd)].map(v => (v == null ? null : Math.min(99, v * k)));
  const day = (mm, dd) => { const h = hrs(mm, dd); let s = 0, w = 0; h.forEach((v, i) => { if (v != null) { s += v * W[i]; w += W[i]; } }); return w ? s / w : 0; };
  const n = new Date(Y, m + 1, 0).getDate(), dd = Math.min(d, n), off = dow(m, 1);
  const v = day(m, dd), h = hrs(m, dd);
  const ok = h.map((x, i) => (x != null && W[i] > 0.03 * WM ? x : null)), vs = ok.filter(x => x != null);
  const lo = ok.indexOf(Math.min(...vs)), hi = ok.indexOf(Math.max(...vs));
  const cname = c ? D.c.find(x => x.Reporting_Airline === c)?.name : '';
  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))' }}>
      <Card title="Pilih tanggal di 2026" sub="Warna menunjukkan peluang delay hari itu. Ketuk tanggal untuk detail per jam.">
        <div className="ctl">
          <select aria-label="Bulan" value={m} onChange={e => setM(+e.target.value)}>{MN.map((x, i) => <option key={i} value={i}>{x} {Y}</option>)}</select>
          <select aria-label="Maskapai" value={c} onChange={e => setC(e.target.value)}>
            <option value="">Semua maskapai</option>{car.map(x => <option key={x.Reporting_Airline} value={x.Reporting_Airline}>{x.name}</option>)}
          </select>
        </div>
        <div className="cal">
          {DN.map(x => <b key={x}>{x.slice(0, 3)}</b>)}
          {Array.from({ length: off }, (_, i) => <span key={'o' + i} />)}
          {Array.from({ length: n }, (_, i) => {
            const dn = i + 1, s = day(m, dn);
            return <button key={dn} style={{ background: hue(s) }} aria-pressed={dn === dd} onClick={() => setD(dn)} aria-label={`${dn} ${MN[m]}: ${f1(s)}%`}>{dn}<small>{Math.round(s)}%</small></button>;
          })}
        </div>
        <div className="leg"><span>rendah</span><i /><span>tinggi</span></div>
      </Card>
      <Card title={`${DN[dow(m, dd)]}, ${dd} ${MN[m]} ${Y}`}>
        <div className="res">
          <div className="ring" role="img" aria-label="Peluang delay, skala 0 sampai 50 persen" style={{ '--p': Math.min(100, v * 2), '--c': hue(v) }}><span className="big">{rate(v)}</span></div>
          <span className="tag" style={{ background: hue(v) }}>{lvl(v)}</span>
        </div>
        <p className="mu" style={{ margin: '0 0 10px' }}>Jam teraman sekitar {lo}:00 ({rate(h[lo])}). Jam paling rawan sekitar {hi}:00 ({rate(h[hi])}).{c ? ` Maskapai: ${cname}.` : ' Semua maskapai.'}</p>
        <ChartCanvas config={{ type: 'bar', data: { labels: h.map((_, i) => i + ':00'), datasets: [{ label: 'Peluang delay (%)', data: h, backgroundColor: h.map(x => (x == null ? '#2a3358' : hue(x))), borderRadius: 4 }] }, options: { plugins: { legend: { display: false }, tooltip: { callbacks: { label: x => f1(x.raw) + '%' } } }, scales: { y: { beginAtZero: true, ticks: { callback: t => t + '%' } }, x: { ticks: { maxTicksLimit: 8 } } } } }} />
        <div className="note">Prediksi berbasis pola 2025 (bulan, hari, jam, maskapai). Hari libur, cuaca, dan gangguan khusus tidak dihitung. Akurasi model sekitar 69%, jadi pakai sebagai gambaran, bukan kepastian.</div>
      </Card>
    </div>
  );
}
