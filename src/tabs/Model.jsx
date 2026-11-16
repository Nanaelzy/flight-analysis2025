import Card from '../components/Card';
import ChartCanvas from '../components/ChartCanvas';
import { K } from '../utils/helpers';

const MS = [['accuracy', 'Akurasi', K.cy], ['balanced_acc', 'Balanced acc.', K.vi], ['f1', 'F1', K.am], ['roc_auc', 'ROC-AUC', K.gr]];
const COLS = ['accuracy', 'balanced_acc', 'precision', 'recall', 'f1', 'roc_auc'];

export default function Model({ D }) {
  const e = D.e, op = e.filter(x => x.threshold.startsWith('optimal'));
  const fi = [...D.f].sort((a, b) => b.importance - a.importance), best = Math.max(...e.map(x => x.roc_auc));
  return (
    <>
      <div className="grid">
        <Card title="Perbandingan model" sub="Pada ambang optimal masing-masing.">
          <ChartCanvas tall config={{ type: 'bar', data: { labels: op.map(x => x.model.replace(' (mayoritas)', '')), datasets: MS.map(m => ({ label: m[1], data: op.map(x => x[m[0]]), backgroundColor: m[2], borderRadius: 4 })) }, options: { scales: { y: { beginAtZero: true, max: 1 } } } }} />
        </Card>
        <Card title="Fitur paling berpengaruh" sub="Penurunan skor model saat fitur diacak.">
          <ChartCanvas tall config={{ type: 'bar', data: { labels: fi.map(x => x.feature), datasets: [{ label: 'Importance', data: fi.map(x => x.importance), backgroundColor: fi.map((x, i) => (i < 3 ? K.am : K.vi)), borderRadius: 6 }] }, options: { indexAxis: 'y', plugins: { legend: { display: false } } } }} />
        </Card>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Semua hasil evaluasi</h3>
        <div className="sc"><table>
          <thead><tr><th>Model</th><th>Ambang</th><th>Akurasi</th><th>Bal. acc</th><th>Presisi</th><th>Recall</th><th>F1</th><th>ROC-AUC</th></tr></thead>
          <tbody>{e.map((x, i) => (
            <tr key={i} className={x.roc_auc === best && x.threshold.startsWith('optimal') ? 'best' : ''}>
              <td>{x.model}</td><td>{x.threshold}</td>{COLS.map(c => <td key={c}>{x[c].toFixed(3)}</td>)}
            </tr>))}</tbody>
        </table></div>
      </div>
    </>
  );
}
