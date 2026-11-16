import { useEffect, useState } from 'react';
import useFlightData from './hooks/useFlightData';
import Sidebar, { TABS } from './components/Sidebar';
import Hero from './components/Hero';
import Ringkasan from './tabs/Ringkasan';
import Waktu from './tabs/Waktu';
import Maskapai from './tabs/Maskapai';
import Penyebab from './tabs/Penyebab';
import Model from './tabs/Model';
import Prediksi from './tabs/Prediksi';

const VIEWS = { ov: Ringkasan, t: Waktu, c: Maskapai, r: Penyebab, m: Model, p: Prediksi };
export default function App() {
  const { D } = useFlightData();
  const [tab, setTab] = useState(() => (TABS.some(t => t[0] === location.hash.slice(1)) ? location.hash.slice(1) : 'ov'));
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.classList.toggle('mo', open); }, [open]);
  useEffect(() => { location.hash = tab; }, [tab]);
  const go = k => { setTab(k); setOpen(false); window.scrollTo(0, 0); };
  const t = TABS.find(x => x[0] === tab);
  const View = VIEWS[tab];
  return (
    <>
      <button id="mb" aria-label="Buka menu" onClick={() => setOpen(o => !o)}>Menu</button>
      <div id="bd" onClick={() => setOpen(false)} />
      <Sidebar tab={tab} go={go} />
      <Hero />
      <main>
        <div id="ph"><h2>{t[1]}</h2><p>{t[2]}</p></div>
        <section className="on"><View key={tab} D={D} /></section>
      </main>
    </>
  );
}
