/** Returns today's date as `YYYY-MM-DD` using the local timezone. */
export function todayIso(): string {
  return toIsoDate(new Date());
}

/** Formats a `Date` as `YYYY-MM-DD`. */
export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Adds (or subtracts) days from an ISO date string, returning a new ISO date string. */
export function addDaysIso(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, (month ?? 1) - 1, day ?? 1);
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

/** Returns the `YYYY-MM` month key for a given ISO date string (defaults to today). */
export function monthKey(isoDate: string = todayIso()): string {
  return isoDate.slice(0, 7);
}

const WEEKDAY_LABELS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const MONTH_LABELS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

/** Formats an ISO date string as a friendly pt-MZ label, e.g. "Quarta-feira, 12 de junho de 2026". */
export function formatDateLong(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, (month ?? 1) - 1, day ?? 1);
  const weekday = WEEKDAY_LABELS[date.getDay()];
  const monthLabel = MONTH_LABELS[date.getMonth()];
  return `${weekday}, ${date.getDate()} de ${monthLabel} de ${date.getFullYear()}`;
}
