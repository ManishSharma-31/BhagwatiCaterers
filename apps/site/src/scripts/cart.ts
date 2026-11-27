// Dish cart ("my selection"). Kept only in this browser tab (sessionStorage) and never sent anywhere.
// It is used to add dishes to the quote message that the visitor sends on WhatsApp.
export interface CartItem { id: string; n: [string, string, string] } // names in mr, en, hi
const KEY = 'bc-cart';
const LANGS = ['mr', 'en', 'hi'];
export const langIndex = () => Math.max(0, LANGS.indexOf(document.documentElement.lang.slice(0, 2)));

export function readCart(): CartItem[] {
  try {
    const v = JSON.parse(sessionStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v.filter((x) => x && typeof x.id === 'string' && Array.isArray(x.n)) : [];
  } catch { return []; }
}
function save(items: CartItem[]) {
  try { sessionStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage blocked: cart lives only until reload */ }
  window.dispatchEvent(new CustomEvent('cart-change'));
}
export const inCart = (id: string) => readCart().some((i) => i.id === id);
export function toggle(item: CartItem): boolean {
  const items = readCart(); const i = items.findIndex((x) => x.id === item.id);
  if (i >= 0) items.splice(i, 1); else items.push(item);
  save(items); return i < 0;
}
export const removeItem = (id: string) => save(readCart().filter((x) => x.id !== id));
export const clearCart = () => save([]);
export const names = (items = readCart()) => items.map((i) => i.n[langIndex()] || i.n[0]);
