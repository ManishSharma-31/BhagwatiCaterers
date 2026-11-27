import { useEffect, useState } from 'preact/hooks';

export interface Route { name: string; parts: string[]; query: URLSearchParams; path: string }

export const parseHash = (hash: string): Route => {
  const raw = hash.replace(/^#\/?/, '');
  const [pathPart, q = ''] = raw.split('?');
  const segs = pathPart.split('/').filter(Boolean).map(decodeURIComponent);
  return { name: segs[0] ?? '', parts: segs.slice(1), query: new URLSearchParams(q), path: '/' + segs.join('/') };
};

export const useRoute = (): Route => {
  const [route, setRoute] = useState(() => parseHash(location.hash));
  useEffect(() => {
    const on = () => setRoute(parseHash(location.hash));
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);
  return route;
};

/** Navigate. Example: go('/leads/abc') or go('/quotes/new?lead=abc'). */
export const go = (path: string) => { location.hash = '#' + (path.startsWith('/') ? path : '/' + path); };
export const href = (path: string) => '#' + (path.startsWith('/') ? path : '/' + path);
