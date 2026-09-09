export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  referralCode: string;
  role: 'AGENT';
  active: boolean;
}

export interface AttendanceToday {
  date: string;
  shift: { name: string; start: string; end: string };
  clockIn?: string;
  clockOut?: string;
  location: { lat: number; lng: number; label: string; accuracyM: number };
  method: 'GPS+SELFIE';
}

export interface AttendanceHistoryItem {
  dd: string;
  mm: string;
  day: string;
  in: string;
  out: string;
  dur: string;
  st: string;
  cls: 'good' | 'warn' | 'info' | 'crit';
}

export interface Prospek {
  id: string;
  name: string;
  address: string;
  picName: string;
  picPhone: string;
  visitTime: string;
  visitDate: string;
  note?: string;
  photoPlang?: string;
  photoSelfie?: string;
  status?: 'verified' | 'pending' | 'rejected';
  coords?: { lat: number; lng: number };
}

export interface NotifItem {
  id: string;
  icon: 'blue' | 'green' | 'orange' | 'red';
  title: string;
  body: string;
  time: string;
  unread: boolean;
  svgKey: string;
}

export interface NotifGroup {
  day: string;
  items: NotifItem[];
}

export interface ChartPoint {
  m: string;
  v: number;
  current?: boolean;
}

export interface DayGroup<T = Prospek> {
  label: string;
  count: number;
  items: T[];
}
