import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'sp-bottom-nav',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="bnav">
      <button class="nav-item" [class.active]="active === 'home'" (click)="go('home')">
        <sp-icon name="home" [size]="22" />
        <span>Beranda</span>
      </button>
      <button class="nav-item" [class.active]="active === 'notif'" (click)="go('notif')">
        <span class="badge-wrap">
          <sp-icon name="bell" [size]="22" />
          @if (unread > 0) { <span class="badge">{{ unread }}</span> }
        </span>
        <span>Notifikasi</span>
      </button>
      <button class="nav-item" [class.active]="active === 'profile'" (click)="go('profile')">
        <sp-icon name="user" [size]="22" />
        <span>Profil</span>
      </button>
    </nav>
  `,
  styles: [`
    :host { display: block; }
    .bnav {
      display: grid; grid-template-columns: 1fr 1fr 1fr;
      background: var(--surface); border-top: 1px solid var(--border);
      padding: 6px 8px calc(6px + env(safe-area-inset-bottom));
      box-shadow: 0 -4px 16px rgba(20,40,70,.05);
    }
    .nav-item {
      background: none; border: none; color: #6b7a93;
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      font-size: var(--fs-xs); padding: 6px 0; border-radius: var(--r-sm);
    }
    .nav-item.active { color: var(--accent-strong); }
    .badge-wrap { position: relative; }
    .badge {
      position: absolute; top: -6px; right: -8px;
      background: var(--crit); color: #fff;
      font-size: 9px; min-width: 14px; height: 14px;
      border-radius: 7px; display: inline-flex; align-items: center;
      justify-content: center; padding: 0 3px;
    }
  `],
})
export class BottomNavComponent {
  @Input() active: 'home' | 'notif' | 'profile' = 'home';
  @Input() unread = 0;
  constructor(private router: Router) {}

  go(section: 'home' | 'notif' | 'profile'): void {
    const path = section === 'notif' ? '/app/notifications' : section === 'profile' ? '/app/profile' : '/app/home';
    this.router.navigateByUrl(path);
  }
}
