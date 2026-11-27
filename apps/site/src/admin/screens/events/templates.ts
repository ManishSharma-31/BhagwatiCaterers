import type { EventType, TaskCategory } from '../../types';
import { addDays } from '../../util';

export interface TemplateItem { mr: string; en: string; category: TaskCategory; offset: number } // offset: days relative to event date (negative = before)
export interface PlannedTask { title: string; category: TaskCategory; dueDate: string; on: boolean }

const base: TemplateItem[] = [
  { mr: 'ग्राहकाशी मेनू व तारीख पक्की करणे', en: 'Confirm menu and date with customer', category: 'planning', offset: -7 },
  { mr: 'अंतिम पाहुण्यांची संख्या २ दिवस आधी निश्चित करा', en: 'Confirm final guest count 2 days before', category: 'planning', offset: -2 },
  { mr: 'कर्मचारी ठरवा व कळवा', en: 'Assign and inform staff', category: 'planning', offset: -5 },
  { mr: 'किराणा व भाजीपाला खरेदी', en: 'Buy ingredients', category: 'shopping', offset: -2 },
  { mr: 'गोड पदार्थ आदल्या दिवशी तयार करा', en: 'Prepare sweets a day before', category: 'prep', offset: -1 },
  { mr: 'भांडी व वाढपाचे साहित्य पॅक करा', en: 'Pack utensils and serving items', category: 'packing', offset: -1 },
  { mr: 'गाडीची व्यवस्था करा', en: 'Arrange vehicle', category: 'transport', offset: -1 },
  { mr: 'वाढप व जेवण सेवा', en: 'Serve the meal', category: 'service', offset: 0 },
  { mr: 'भांडी गोळा करून परत आणा, आवराआवर', en: 'Collect utensils and clean up', category: 'cleanup', offset: 1 },
  { mr: 'उर्वरित (बाकी) रक्कम वसूल करा', en: 'Collect balance payment', category: 'payment', offset: 0 },
];
const advance: TemplateItem = { mr: 'अ‍ॅडव्हान्स रक्कम मिळाल्याची नोंद करा', en: 'Record the advance payment', category: 'payment', offset: -7 };
const extras: Partial<Record<EventType, TemplateItem[]>> = {
  wedding: [
    advance,
    { mr: 'जागेची व स्वयंपाकघर/गॅसची पाहणी करा', en: 'Visit venue; check kitchen space and gas', category: 'planning', offset: -4 },
    { mr: 'जादा वाढपी / मदतनीस बोलवा', en: 'Call extra servers and helpers', category: 'planning', offset: -3 },
    { mr: 'पाणी, टेबल, खुर्च्यांची व्यवस्था तपासा', en: 'Check water, tables and chairs', category: 'packing', offset: -1 },
  ],
  engagement: [advance],
  haldi: [advance],
  housewarming: [
    { mr: 'पूजेसाठी प्रसादाची तयारी', en: 'Prepare prasad for the puja', category: 'prep', offset: 0 },
  ],
  puja: [
    { mr: 'प्रसादाचे साहित्य खरेदी', en: 'Buy prasad ingredients', category: 'shopping', offset: -1 },
  ],
  birthday: [advance],
  office: [advance],
};
// Home food orders are small: no service/cleanup crew steps.
const homeFood: TemplateItem[] = [
  { mr: 'ऑर्डर व वेळ पक्की करा', en: 'Confirm order and delivery time', category: 'planning', offset: -1 },
  { mr: 'साहित्य खरेदी', en: 'Buy ingredients', category: 'shopping', offset: -1 },
  { mr: 'स्वयंपाक तयार करा', en: 'Cook the order', category: 'prep', offset: 0 },
  { mr: 'डबे / पॅकिंग', en: 'Pack the food', category: 'packing', offset: 0 },
  { mr: 'डिलिव्हरी / पोहोच', en: 'Deliver', category: 'transport', offset: 0 },
  { mr: 'पैसे वसूल करा', en: 'Collect payment', category: 'payment', offset: 0 },
];

export const templateFor = (type: EventType): TemplateItem[] => (type === 'home-food' ? homeFood : [...(extras[type] ?? []), ...base]);

/**
 * Build the editable checklist. Due date = event date + offset. If that date has already passed but the event
 * is still ahead, the task is due today (never created already overdue). If the event itself is in the past, dates stay as computed.
 */
export function planTasks(type: EventType, eventDate: string, todayIso: string, lang: 'mr' | 'en'): PlannedTask[] {
  if (!eventDate) return [];
  return templateFor(type)
    .map((t) => {
      let due = addDays(eventDate, t.offset);
      if (eventDate >= todayIso && due < todayIso) due = todayIso;
      return { title: lang === 'mr' ? t.mr : t.en, category: t.category, dueDate: due, on: true, _o: t.offset };
    })
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a._o - b._o)
    .map(({ _o, ...rest }) => rest);
}
