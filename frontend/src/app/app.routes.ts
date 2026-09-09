import { Routes } from '@angular/router';
import { PreloadingStrategy } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SplashComponent } from './features/auth/splash/splash.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ClockInGuard } from './core/guards/clock-in.guard';
import { ShellComponent } from './layout/shell.component';

@Injectable({ providedIn: 'root' })
export class SelectivePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.['preload'] === false ? of(null) : load();
  }
}

type Route = import('@angular/router').Route;

export const APP_ROUTES: Routes = [
  { path: '', component: SplashComponent, title: 'Sales Point' },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'loading',
    loadComponent: () =>
      import('./features/auth/loading/loading.component').then((m) => m.LoadingComponent),
  },
  {
    path: 'clock-in',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/attendance/gate/clock-in-gate.component').then(
        (m) => m.ClockInGateComponent,
      ),
  },
  {
    path: 'app',
    canActivate: [AuthGuard, ClockInGuard],
    component: ShellComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('./features/attendance/detail/attendance-detail.component').then(
            (m) => m.AttendanceDetailComponent,
          ),
      },
      {
        path: 'prospek/new',
        loadComponent: () =>
          import('./features/prospek/checkin/prospek-checkin.component').then(
            (m) => m.ProspekCheckinComponent,
          ),
      },
      {
        path: 'prospek/history',
        loadComponent: () =>
          import('./features/prospek/history/prospek-history.component').then(
            (m) => m.ProspekHistoryComponent,
          ),
      },
      {
        path: 'prospek/:id',
        loadComponent: () =>
          import('./features/prospek/detail/prospek-detail.component').then(
            (m) => m.ProspekDetailComponent,
          ),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./features/notifications/notifications.component').then(
            (m) => m.NotificationsComponent,
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: 'camera/:shot',
    canActivate: [AuthGuard],
    data: { preload: false },
    loadComponent: () =>
      import('./features/camera/camera.component').then((m) => m.CameraComponent),
  },
  {
    path: 'photo/:id/:kind',
    canActivate: [AuthGuard],
    data: { preload: false },
    loadComponent: () =>
      import('./features/photo-viewer/photo-viewer.component').then((m) => m.PhotoViewerComponent),
  },
  { path: '**', redirectTo: '' },
];
