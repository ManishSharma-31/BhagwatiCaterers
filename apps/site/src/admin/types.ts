// Data model for the owner dashboard. Shared by every screen. Do not rename fields without updating docs/phase2-design.md.
export type Lang = 'mr' | 'en';

export interface Base { id: string; createdAt: string; updatedAt: string }

export const LEAD_STATUSES = ['new', 'contacted', 'quoted', 'confirmed', 'completed', 'lost'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export const LEAD_SOURCES = ['whatsapp', 'call', 'walkin', 'referral', 'website', 'other'] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];
export const EVENT_TYPES = ['wedding', 'engagement', 'haldi', 'housewarming', 'puja', 'birthday', 'office', 'home-food', 'other'] as const;
export type EventType = (typeof EVENT_TYPES)[number];
export const ORDER_TYPES = ['with-material', 'without-material', 'not-sure'] as const; // with-material = customer provides ingredients
export type OrderType = (typeof ORDER_TYPES)[number];

export interface Lead extends Base {
  name: string;
  phone: string;
  eventType: EventType;
  eventDate?: string; // YYYY-MM-DD
  guests?: number;
  town?: string;
  orderType: OrderType;
  cuisines: string[]; // 'maharashtrian' | 'south-indian' | 'rajasthani' | 'mixed'
  notes?: string;
  status: LeadStatus;
  source: LeadSource;
  nextFollowUp?: string; // YYYY-MM-DD
  lostReason?: string;
}

export interface QuoteLine { label: string; amount: number } // extra charges (labour, transport, decoration, ...)
export const QUOTE_STATUSES = ['draft', 'sent', 'accepted', 'rejected'] as const;
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];
export interface Quote extends Base {
  leadId?: string;
  eventId?: string;
  customerName: string;
  customerPhone: string;
  eventTitle: string;
  eventDate?: string;
  town?: string;
  orderType: OrderType;
  dishIds: string[]; // MenuItem ids chosen
  extraDishes: string[]; // free-text dishes
  guests: number;
  perPlate: number; // rupees per plate (or per head labour for with-material orders)
  lines: QuoteLine[];
  discount: number;
  advanceAmount: number; // advance asked at booking, rupees
  status: QuoteStatus;
  validUntil?: string;
  terms?: string;
  notes?: string;
}
// total = guests * perPlate + sum(lines) - discount   (see util.quoteTotal)

export const EVENT_STATUSES = ['planned', 'confirmed', 'done', 'cancelled'] as const;
export type EventStatus = (typeof EVENT_STATUSES)[number];
export interface CatEvent extends Base {
  leadId?: string;
  quoteId?: string;
  title: string;
  eventType: EventType;
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:MM
  venue?: string;
  town?: string;
  guests: number;
  orderType: OrderType;
  dishIds: string[];
  extraDishes: string[];
  staffIds: string[];
  status: EventStatus;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
}

export const TASK_CATEGORIES = ['planning', 'shopping', 'prep', 'packing', 'transport', 'service', 'cleanup', 'payment', 'other'] as const;
export type TaskCategory = (typeof TASK_CATEGORIES)[number];
export interface Task extends Base {
  eventId?: string;
  title: string;
  category: TaskCategory;
  dueDate?: string;
  assigneeId?: string; // Staff id
  done: boolean;
  notes?: string;
}

export interface Staff extends Base {
  name: string;
  phone?: string;
  role: 'cook' | 'helper' | 'server' | 'driver' | 'manager' | 'other';
  active: boolean;
  dailyWage?: number;
  notes?: string;
}

export const PAYMENT_METHODS = ['upi', 'cash', 'bank', 'cheque', 'other'] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
export interface Payment extends Base {
  eventId?: string;
  leadId?: string;
  quoteId?: string;
  customerName?: string;
  amount: number; // rupees, positive
  direction: 'in' | 'out'; // in = received from customer, out = expense (ingredients, wages)
  kind: 'advance' | 'balance' | 'full' | 'expense' | 'other';
  method: PaymentMethod;
  date: string; // YYYY-MM-DD
  reference?: string; // UPI transaction id etc.
  note?: string;
}

export interface MenuItem extends Base {
  nameMr: string;
  nameEn: string;
  cuisine: 'maharashtrian' | 'south-indian' | 'rajasthani' | 'common';
  category: 'starter' | 'main' | 'bread' | 'rice' | 'sweet' | 'snack' | 'drink' | 'accompaniment';
  active: boolean;
  // Optional planning quantities per 100 guests, used by kitchen sheets. Owner fills in over time.
  perHundred?: { ingredient: string; qty: number; unit: 'kg' | 'g' | 'l' | 'ml' | 'pcs' }[];
}

export interface Settings extends Base {
  businessName: string;
  ownerName: string;
  phone: string;
  fssai: string;
  upiId?: string;
  defaultTerms?: string; // shown on quotes
  pinHash?: string; // local-mode lock (a deterrent only, not strong security)
  pinSalt?: string;
  cloud?: { url: string; anonKey: string }; // Supabase project (anon key is public by design; protected by row-level security)
}

export interface EntityMap {
  leads: Lead; quotes: Quote; events: CatEvent; tasks: Task; staff: Staff; payments: Payment; menu: MenuItem; settings: Settings;
}
export type EntityName = keyof EntityMap;
export const ENTITY_NAMES: EntityName[] = ['leads', 'quotes', 'events', 'tasks', 'staff', 'payments', 'menu', 'settings'];

export interface Backup {
  app: 'bhagwati-caterers';
  version: 1;
  exportedAt: string;
  data: { [K in EntityName]: EntityMap[K][] };
}
