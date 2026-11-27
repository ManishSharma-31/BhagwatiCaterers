import { useState } from 'preact/hooks';
import { tr, useStore } from '../../hooks';
import type { Lang, MenuItem } from '../../types';

type Row = NonNullable<MenuItem['perHundred']>[number];
const UNITS: Row['unit'][] = ['kg', 'g', 'l', 'ml', 'pcs'];

/** Inline editor: ingredient name, quantity per 100 guests, unit. Saves to the MenuItem. Nothing is pre-filled. */
export function QtyEditor({ lang, dish, onClose }: { lang: Lang; dish: MenuItem; onClose: () => void }) {
  const store = useStore();
  const [rows, setRows] = useState<{ ingredient: string; qty: string; unit: Row['unit'] }[]>(
    dish.perHundred?.length ? dish.perHundred.map((r) => ({ ingredient: r.ingredient, qty: String(r.qty), unit: r.unit })) : [{ ingredient: '', qty: '', unit: 'kg' }],
  );
  const [err, setErr] = useState('');
  const upd = (i: number, p: Partial<(typeof rows)[number]>) => setRows(rows.map((r, j) => (j === i ? { ...r, ...p } : r)));
  const save = async () => {
    const clean: Row[] = rows.filter((r) => r.ingredient.trim() && Number(r.qty) > 0).map((r) => ({ ingredient: r.ingredient.trim(), qty: Number(r.qty), unit: r.unit }));
    if (rows.some((r) => (r.ingredient.trim() && !(Number(r.qty) > 0)) || (!r.ingredient.trim() && r.qty))) return setErr(tr(lang, 'प्रत्येक ओळीत साहित्याचे नाव व प्रमाण (० पेक्षा जास्त) हवे.', 'Each row needs an ingredient name and a quantity above 0.'));
    await store.put('menu', { ...dish, perHundred: clean.length ? clean : undefined });
    onClose();
  };
  return (
    <div class="no-print" style="margin-top:.5rem">
      <p class="small muted">{tr(lang, 'अंदाजे १०० पाहुण्यांसाठी लागणारे प्रमाण लिहा.', 'Enter the quantity needed for 100 guests.')}</p>
      {rows.map((r, i) => (
        <div class="sh-edit-row" key={i}>
          <input aria-label={tr(lang, 'साहित्य', 'Ingredient')} placeholder={tr(lang, 'साहित्य', 'Ingredient')} value={r.ingredient} onInput={(e) => upd(i, { ingredient: (e.target as HTMLInputElement).value })} />
          <input aria-label={tr(lang, 'प्रमाण', 'Quantity')} placeholder={tr(lang, 'प्रमाण', 'Qty')} type="number" inputMode="decimal" min="0" step="any" value={r.qty} onInput={(e) => upd(i, { qty: (e.target as HTMLInputElement).value })} />
          <select aria-label={tr(lang, 'एकक', 'Unit')} value={r.unit} onChange={(e) => upd(i, { unit: (e.target as HTMLSelectElement).value as Row['unit'] })}>{UNITS.map((u) => <option value={u}>{u}</option>)}</select>
          <button type="button" class="btn btn-ghost btn-sm" aria-label={tr(lang, 'ओळ काढा', 'Remove row')} onClick={() => setRows(rows.filter((_, j) => j !== i))}>×</button>
        </div>
      ))}
      {err && <p class="err" role="alert">{err}</p>}
      <div class="row">
        <button type="button" class="btn btn-sm btn-ghost" onClick={() => setRows([...rows, { ingredient: '', qty: '', unit: 'kg' }])}>+ {tr(lang, 'साहित्य', 'Ingredient')}</button>
        <button type="button" class="btn btn-sm btn-green" onClick={save}>{tr(lang, 'जतन करा', 'Save')}</button>
        <button type="button" class="btn btn-sm btn-ghost" onClick={onClose}>{tr(lang, 'रद्द', 'Cancel')}</button>
      </div>
    </div>
  );
}
