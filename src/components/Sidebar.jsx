export const TABS = [
  ['ov', 'Ringkasan', 'Angka kunci dan temuan utama dari seluruh data.'],
  ['t', 'RQ1 Waktu', 'Kapan delay paling sering terjadi: bulan, hari, dan jam.'],
  ['c', 'RQ1 Maskapai', 'Perbandingan 14 maskapai dari berbagai sisi.'],
  ['r', 'RQ2 Penyebab', 'Apa yang membuat penerbangan terlambat.'],
  ['m', 'RQ3 Model', 'Seberapa baik model memprediksi delay.'],
  ['p', 'Prediksi 2026', 'Pilih tanggal di 2026 untuk melihat peluang delay.'],
];
const IC = {
  ov: <path d="M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 14h7v6H4z" />,
  t: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>,
  c: <path d="M3 12l18-8-6 16-3-7z" />,
  r: <><path d="M12 4l9 16H3z" /><path d="M12 10v4M12 17v.01" /></>,
  m: <path d="M5 20V10M12 20V4M19 20v-7" />,
  p: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></>,
};

export default function Sidebar({ tab, go }) {
  return (
    <nav>
      <div className="brand">
        <i><svg viewBox="0 0 24 24"><path d="M2 12l20-9-7 19-3-8z" /></svg></i>
        <span>Flight Delay<br />Analytics 2025</span>
      </div>
      <div role="tablist" id="tabs" aria-orientation="vertical">
        {TABS.map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => go(id)}>
            <svg viewBox="0 0 24 24">{IC[id]}</svg>{label}
          </button>
        ))}
      </div>
    </nav>
  );
}
