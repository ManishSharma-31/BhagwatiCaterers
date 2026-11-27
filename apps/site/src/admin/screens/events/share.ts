import type { CatEvent } from '../../types';

/** Clear staff message. Text only; the customer's phone is not included. */
export function eventShareText(ev: CatEvent, o: { lang: 'mr' | 'en'; typeLabel: string; dateText: string; dishes: string[]; staff: string[]; town?: string }): string {
  const mr = o.lang === 'mr';
  const L = (a: string, b: string) => (mr ? a : b);
  const lines = [
    `*${ev.title}*`,
    `${L('प्रकार', 'Type')}: ${o.typeLabel}`,
    `${L('तारीख', 'Date')}: ${o.dateText}${ev.startTime ? ' ' + ev.startTime : ''}`,
  ];
  if (ev.venue || o.town) lines.push(`${L('ठिकाण', 'Venue')}: ${[ev.venue, o.town].filter(Boolean).join(', ')}`);
  lines.push(`${L('पाहुणे', 'Guests')}: ${ev.guests}`);
  if (o.dishes.length) lines.push('', `${L('पदार्थ', 'Dishes')}:`, ...o.dishes.map((d) => `- ${d}`));
  if (o.staff.length) lines.push('', `${L('कर्मचारी', 'Staff')}: ${o.staff.join(', ')}`);
  if (ev.notes) lines.push('', `${L('सूचना', 'Notes')}: ${ev.notes}`);
  lines.push('', L('- भगवती केटरर्स', '- Bhagwati Caterers'));
  return lines.join('\n');
}
