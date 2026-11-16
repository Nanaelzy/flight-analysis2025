import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function ChartCanvas({ config, tall }) {
  const ref = useRef(null);
  const key = JSON.stringify(config);
  useEffect(() => {
    const c = new Chart(ref.current, config);
    return () => c.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return <div className={'cv' + (tall ? ' t' : '')}><canvas ref={ref} /></div>;
}
