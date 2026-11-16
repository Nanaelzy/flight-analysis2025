export default function Hero() {
  const path = 'M10 110C110 -10 290 -10 390 110';
  return (
    <header>
      <svg className="arc" viewBox="0 0 400 120" aria-hidden="true">
        <defs><linearGradient id="g"><stop offset="0" stopColor="#38bdf8" /><stop offset="1" stopColor="#f472b6" /></linearGradient></defs>
        <path d={path} fill="none" stroke="url(#g)" strokeWidth="2" strokeDasharray="3 7" />
        <circle cx="10" cy="110" r="5" fill="#38bdf8" /><circle cx="390" cy="110" r="5" fill="#f472b6" />
        <g><path d="M-9-7l22 7-22 7 5-7z" fill="#fff" /><animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path={path} /></g>
      </svg>
      <h1>Kapan penerbangan di AS paling sering terlambat?</h1>
      <p>6,88 juta penerbangan domestik sepanjang 2025: waktu, maskapai, penyebab, dan prediksi peluang delay untuk tanggal di 2026.</p>
    </header>
  );
}
