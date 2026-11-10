'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// The WebGL scene is its own chunk and only loads once the page is idle,
// so it never delays the first paint of the Project page.
const Volcano = dynamic(() => import('./Volcano'), { ssr: false });

const VolcanoLazy = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 600));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const id = idle(() => setReady(true), { timeout: 2500 });
    return () => cancel(id);
  }, []);

  return ready ? <Volcano /> : null;
};

export default VolcanoLazy;
