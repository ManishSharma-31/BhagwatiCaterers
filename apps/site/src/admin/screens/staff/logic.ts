// Pure wage helpers for the Staff screen. Amounts come only from what the owner typed (daily wage, payments).
import type { CatEvent, Payment, Staff } from '../../types';

export interface WageMonth { days: number; estimate: number; paid: number; due: number; paidTotal: number }

/** Days worked this month = distinct event dates (not cancelled, up to today) the person was assigned to. estimate = days x dailyWage (only when a wage was typed). */
export function wageMonth(s: Staff, events: CatEvent[], payments: Payment[], monthKey: string, todayIso: string): WageMonth {
  const dates = new Set(events.filter((e) => e.status !== 'cancelled' && e.staffIds.includes(s.id) && e.date.startsWith(monthKey) && e.date <= todayIso).map((e) => e.date));
  const mine = payments.filter((p) => p.direction === 'out' && p.staffId === s.id);
  const paid = mine.filter((p) => p.date.startsWith(monthKey)).reduce((t, p) => t + (p.amount || 0), 0);
  const paidTotal = mine.reduce((t, p) => t + (p.amount || 0), 0);
  const estimate = (s.dailyWage || 0) * dates.size;
  return { days: dates.size, estimate, paid, due: estimate - paid, paidTotal };
}
