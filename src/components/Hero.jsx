const CONTENT = {
  ov: ['Kapan penerbangan di AS paling sering terlambat?', '6,88 juta penerbangan domestik sepanjang 2025: waktu, maskapai, penyebab, dan prediksi peluang delay untuk tanggal di 2026.'],
  t: ['Bagaimana pola keterlambatan berubah menurut waktu?', 'Analisis pola keterlambatan bulanan, harian, dan jam keberangkatan pada tahun 2025.'],
  c: ['Maskapai mana yang paling berkontribusi terhadap keterlambatan?', 'Perbandingan jumlah dan tingkat keterlambatan di antara maskapai penerbangan pada tahun 2025.'],
  r: ['Apa faktor dominan penyebab keterlambatan penerbangan?', 'Analisis kontribusi Carrier, Weather, NAS, Security, dan Late Aircraft terhadap keterlambatan.'],
  m: ['Seberapa akurat model memprediksi keterlambatan penerbangan?', 'Evaluasi model machine learning berdasarkan fitur jadwal dan operasional pra-keberangkatan.'],
  p: ['Berapa peluang penerbangan mengalami keterlambatan pada 2026?', 'Lihat estimasi peluang delay berdasarkan tanggal dan informasi penerbangan yang dipilih.'],
};

export default function Hero({ tab }) {
  const path = 'M10 110C110 -10 290 -10 390 110';
  const [title, description] = CONTENT[tab] || CONTENT.ov;
  return (
    <header>
      <svg className="arc" viewBox="0 0 400 120" aria-hidden="true">
        <defs><linearGradient id="g"><stop offset="0" stopColor="#38bdf8" /><stop offset="1" stopColor="#f472b6" /></linearGradient></defs>
        <path d={path} fill="none" stroke="url(#g)" strokeWidth="2" strokeDasharray="3 7" />
        <circle cx="10" cy="110" r="5" fill="#38bdf8" /><circle cx="390" cy="110" r="5" fill="#f472b6" />
        <g><path d="M-9-7l22 7-22 7 5-7z" fill="#fff" /><animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path={path} /></g>
      </svg>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
