// Small shared UI pieces: copy button, toast, "show more" paging.
import { useEffect, useState } from 'preact/hooks';
import type { Lang } from './types';
import { copyText } from './util';
import { tr } from './hooks';

/** Button that copies text (computed when tapped) and says so for two seconds. */
export function CopyButton({ lang, text, label, small = true, ghost = true }: { lang: Lang; text: string | (() => string); label?: string; small?: boolean; ghost?: boolean }) {
  const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle');
  useEffect(() => { if (state === 'idle') return; const t = setTimeout(() => setState('idle'), 2000); return () => clearTimeout(t); }, [state]);
  const run = async () => setState((await copyText(typeof text === 'function' ? text() : text)) ? 'ok' : 'fail');
  return (
    <button type="button" class={'btn' + (small ? ' btn-sm' : '') + (ghost ? ' btn-ghost' : '')} onClick={run}>
      {state === 'ok' ? '✔ ' + tr(lang, 'कॉपी झाले', 'Copied') : state === 'fail' ? tr(lang, 'कॉपी झाले नाही', 'Could not copy') : '📋 ' + (label ?? tr(lang, 'कॉपी करा', 'Copy'))}
    </button>
  );
}

export interface ToastData { text: string; kind?: 'info' | 'error'; action?: { label: string; run: () => void } }
export function Toast({ toast, onClose }: { toast: ToastData | null; onClose: () => void }) {
  if (!toast) return null;
  return (
    <div class={'toast no-print ' + (toast.kind === 'error' ? 'toast-err' : '')} role={toast.kind === 'error' ? 'alert' : 'status'}>
      <span class="toast-text">{toast.text}</span>
      {toast.action && <button type="button" class="btn btn-sm toast-act" onClick={() => { toast.action!.run(); }}>{toast.action.label}</button>}
      <button type="button" class="toast-x" aria-label="Close" onClick={onClose}>✕</button>
    </div>
  );
}

export interface Pager { n: number; step: number; showMore: () => void }
/** Hook part of paging (call it with the other hooks, before any early return). */
export function usePager(step = 60, resetKey = ''): Pager {
  const [n, setN] = useState(step);
  useEffect(() => setN(step), [resetKey]);
  return { n, step, showMore: () => setN(n + step) };
}
export const pageOf = <T,>(items: T[], p: Pager) => ({ shown: items.slice(0, p.n), more: items.length > p.n, total: items.length, showMore: p.showMore });

/** Show the first `step` rows, with a "show more" button, so lists with hundreds of records stay fast. */
export function usePaged<T>(items: T[], step = 60, resetKey = '') {
  const [n, setN] = useState(step);
  useEffect(() => setN(step), [resetKey]);
  return { shown: items.slice(0, n), more: items.length > n, total: items.length, showMore: () => setN(n + step) };
}
export function MoreButton({ lang, paged }: { lang: Lang; paged: { more: boolean; total: number; shown: unknown[]; showMore: () => void } }) {
  if (!paged.more) return null;
  return (
    <p style="text-align:center"><button type="button" class="btn btn-ghost" onClick={paged.showMore}>{tr(lang, `आणखी दाखवा (${paged.shown.length}/${paged.total})`, `Show more (${paged.shown.length}/${paged.total})`)}</button></p>
  );
}
