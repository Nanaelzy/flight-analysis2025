import { useEffect, useState } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';
import { fallback } from '../data/fallback';
import { toD } from '../utils/toD';

// Data real-time dari Firebase. Bila config belum diisi, memakai data bawaan.
export default function useFlightData() {
  const [D, setD] = useState(fallback);
  const [status, setStatus] = useState('Memakai data bawaan');
  useEffect(() => {
    if (/ISI/.test(firebaseConfig.apiKey)) { setStatus('Config belum terisi: memakai data bawaan'); return; }
    setStatus('Menghubungkan ke Firebase...');
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const off = onValue(ref(getDatabase(app), '/'), s => {
      const r = s.val();
      if (!r) { setStatus('Terhubung, tapi database kosong'); return; }
      try { setD(toD(r)); setStatus('Terhubung ke Firebase ✓ ' + new Date().toLocaleTimeString()); }
      catch (e) { console.error(e); setStatus('Gagal memproses data: ' + e.message); }
    }, e => setStatus('Gagal: ' + e.message));
    return () => off();
  }, []);
  return { D, status };
}
