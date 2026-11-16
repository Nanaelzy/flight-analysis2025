import { useState } from 'react';
import ChartCanvas from '../components/ChartCanvas';
import { K, fmt, f1, byRate } from '../utils/helpers';

const CM = [
  ['delay_rate_%', 'Tingkat delay (%)', '%'],
  ['avg_delay_min_if_late', 'Rata-rata menit bila terlambat', ' mnt'],
  ['share_of_delays_%', 'Porsi dari total delay (%)', '%'],
  ['avg_arr_delay_min', 'Rata-rata delay kedatangan', ' mnt'],
];

export default function Maskapai({ D }) {
  const [i, setI] = useState(0);
  const k = CM[i], d = [...D.c].sort((a, b) => b[k[0]] - a[k[0]]), car = byRate(D.c);
  return (
    <>
      <div className="card">
        <h3>Peringkat maskapai</h3><p>Ketuk metrik untuk mengganti urutan.</p>
        <div className="row">{CM.map((x, j) => <button key={j} className="chip" aria-pressed={i === j} onClick={() => setI(j)}>{x[1]}</button>)}</div>
        <ChartCanvas tall config={{ type: 'bar', data: { labels: d.map(x => x.name), datasets: [{ label: k[1], data: d.map(x => x[k[0]]), backgroundColor: d.map((x, n) => (n < 3 ? K.co : n > d.length - 4 ? K.gr : K.cy)), borderRadius: 6 }] }, options: { indexAxis: 'y', plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => f1(c.raw) + k[2] } } } } }} />
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Porsi penerbangan vs porsi delay</h3>
        <p>Angka porsi delay di atas porsi penerbangan berarti maskapai itu lebih sering terlambat dari ukurannya.</p>
        <div className="sc"><table>
          <thead><tr><th>Maskapai</th><th>Penerbangan</th><th>Porsi penerbangan</th><th>Porsi delay</th><th>Jam delay</th></tr></thead>
          <tbody>{car.map(x => (
            <tr key={x.Reporting_Airline}>
              <td>{x.name} ({x.Reporting_Airline})</td><td>{fmt(x.flights)}</td><td>{f1(x['share_of_flights_%'])}%</td>
              <td style={{ color: x['share_of_delays_%'] > x['share_of_flights_%'] ? K.co : K.gr }}>{f1(x['share_of_delays_%'])}%</td>
              <td>{fmt(x.total_delay_hours)}</td>
            </tr>))}</tbody>
        </table></div>
      </div>
    </>
  );
}
