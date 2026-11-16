import { useEffect, useState } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';
import { toD } from '../utils/toD';

// Data real-time hanya dari Firebase.
export default function useFlightData() {
  const [D, setD] = useState(null);
  const [status, setStatus] = useState('Menghubungkan ke Firebase...');
  useEffect(() => {
    if (/ISI/.test(firebaseConfig.apiKey)) {
      setStatus('Config Firebase belum terisi.');
      return;
    }
    let off = () => {};
    try {
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      off = onValue(ref(getDatabase(app), '/'), s => {
        const r = s.val();
        if (!r) {
          setD(null);
          setStatus('Database Firebase kosong.');
          return;
        }
        try {
          setD(toD(r));
          setStatus('Data berhasil dimuat dari Firebase.');
        } catch (e) {
          console.error(e);
          setD(null);
          setStatus('Gagal memproses data Firebase: ' + e.message);
        }
      }, e => {
        setD(null);
        setStatus('Gagal terhubung ke Firebase: ' + e.message);
      });
    } catch (e) {
      console.error(e);
      setStatus('Gagal menginisialisasi Firebase: ' + e.message);
    }
    return () => off();
  }, []);
  return { D, status };
}
