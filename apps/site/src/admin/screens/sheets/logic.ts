import type { MenuItem } from '../../types';

type Unit = 'kg' | 'g' | 'l' | 'ml' | 'pcs';
export interface ShopItem { name: string; qty: number; unit: 'kg' | 'l' | 'pcs'; from: string[] }
export interface ShopGroup { unit: 'kg' | 'l' | 'pcs'; items: ShopItem[] }
export interface DishLine { ingredient: string; qty: number; unit: Unit }

const round = (n: number) => Math.round(n * 1000) / 1000;
/** Quantity for `guests` from a per-100-guests figure. */
export const scale = (perHundredQty: number, guests: number) => round((perHundredQty * (guests || 0)) / 100);

/** Convert g to kg and ml to l so the same ingredient in different units adds up. */
const toBase = (qty: number, unit: Unit): { qty: number; unit: 'kg' | 'l' | 'pcs' } =>
  unit === 'g' ? { qty: qty / 1000, unit: 'kg' } : unit === 'ml' ? { qty: qty / 1000, unit: 'l' } : { qty, unit };

export const hasQty = (m: MenuItem) => !!m.perHundred && m.perHundred.some((r) => r.ingredient.trim() && r.qty > 0);

export function dishLines(m: MenuItem, guests: number): DishLine[] {
  return (m.perHundred ?? []).filter((r) => r.ingredient.trim() && r.qty > 0).map((r) => ({ ingredient: r.ingredient.trim(), qty: scale(r.qty, guests), unit: r.unit }));
}

/** Ingredients totalled across dishes (only from perHundred), grouped by unit. Dishes with no data go to `missing`. */
export function shoppingTotals(dishes: MenuItem[], guests: number, nameOf: (m: MenuItem) => string = (m) => m.nameEn) {
  const map = new Map<string, ShopItem>();
  const missing: MenuItem[] = [];
  for (const d of dishes) {
    if (!hasQty(d)) { missing.push(d); continue; }
    for (const r of d.perHundred!) {
      if (!r.ingredient.trim() || !(r.qty > 0)) continue;
      const b = toBase(scale(r.qty, guests), r.unit);
      const key = r.ingredient.trim().toLowerCase() + '|' + b.unit;
      const cur = map.get(key) ?? { name: r.ingredient.trim(), qty: 0, unit: b.unit, from: [] };
      cur.qty = round(cur.qty + b.qty);
      const n = nameOf(d);
      if (!cur.from.includes(n)) cur.from.push(n);
      map.set(key, cur);
    }
  }
  const groups: ShopGroup[] = (['kg', 'l', 'pcs'] as const)
    .map((unit) => ({ unit, items: [...map.values()].filter((i) => i.unit === unit).sort((a, b) => a.name.localeCompare(b.name)) }))
    .filter((g) => g.items.length);
  return { groups, missing };
}

/** Friendly quantity text: 0.25 kg -> "250 g", 1.5 kg -> "1.5 kg". */
export function fmtQty(qty: number, unit: 'kg' | 'l' | 'pcs' | Unit): string {
  const n = (x: number) => String(Math.round(x * 100) / 100);
  if (unit === 'kg' && qty < 1) return `${n(qty * 1000)} g`;
  if (unit === 'l' && qty < 1) return `${n(qty * 1000)} ml`;
  return `${n(qty)} ${unit}`;
}

export const STARTER_PACKING: { mr: string; en: string }[] = [
  { mr: 'मोठी स्वयंपाकाची भांडी (पातेली, कढई)', en: 'Large cooking vessels' },
  { mr: 'वाढपाचे चमचे व डाव', en: 'Serving spoons and ladles' },
  { mr: 'ताटे / प्लेट्स', en: 'Plates' },
  { mr: 'वाट्या', en: 'Bowls' },
  { mr: 'ग्लास', en: 'Glasses' },
  { mr: 'पाण्याचे कॅन', en: 'Water cans' },
  { mr: 'टेबल', en: 'Tables' },
  { mr: 'टेबलक्लॉथ / कापड', en: 'Tablecloths' },
  { mr: 'कचरापेट्या', en: 'Dustbins' },
  { mr: 'गॅस सिलेंडर व शेगडी', en: 'Gas cylinders and stove' },
];
