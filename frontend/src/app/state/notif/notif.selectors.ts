import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface NotifState {
  groups: { day: string; items: { id: string; unread: boolean }[] }[];
  unread: number;
  loading: boolean;
}

export const initialNotifState: NotifState = {
  groups: [],
  unread: 0,
  loading: false,
};

const slice = createFeatureSelector<NotifState>('notif');
export const selectUnreadNotif = createSelector(slice, (s) => s.unread);
export const selectNotifGroups = createSelector(slice, (s) => s.groups);
