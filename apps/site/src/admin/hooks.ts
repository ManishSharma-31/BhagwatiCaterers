import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import type { Store } from './store';
import type { EntityMap, EntityName, Lang } from './types';

export const StoreContext = createContext<Store | null>(null);
export const useStore = (): Store => {
  const s = useContext(StoreContext);
  if (!s) throw new Error('Store not ready');
  return s;
};

/** Live list of an entity; null while loading. Re-reads automatically after any change. */
export function useList<K extends EntityName>(entity: K): EntityMap[K][] | null {
  const store = useStore();
  const [items, setItems] = useState<EntityMap[K][] | null>(null);
  useEffect(() => {
    let alive = true;
    const load = () => store.list(entity).then((v) => alive && setItems(v)).catch(() => alive && setItems([]));
    load();
    const off = store.subscribe(load);
    return () => { alive = false; off(); };
  }, [store, entity]);
  return items;
}

/** Live single item; undefined while loading or if missing (check useList for loading state when needed). */
export function useItem<K extends EntityName>(entity: K, id: string | undefined): EntityMap[K] | undefined {
  const list = useList(entity);
  return list?.find((x) => x.id === id);
}

export const LangContext = createContext<Lang>('mr');
export const useLang = () => useContext(LangContext);
/** Pick the Marathi or English string. */
export const tr = (lang: Lang, mr: string, en: string) => (lang === 'mr' ? mr : en);
