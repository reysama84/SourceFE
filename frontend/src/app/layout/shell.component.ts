import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter, map, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { BottomNavComponent } from '../shared/components/bottom-nav/bottom-nav.component';
import { selectUnreadNotif } from '../state/notif/notif.selectors';

type NavSection = 'home' | 'notif' | 'profile';

@Component({
  selector: 'sp-shell',
  standalone: true,
  imports: [RouterOutlet, BottomNavComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shell">
      <main class="content">
        <router-outlet />
      </main>
      <sp-bottom-nav [active]="active$ | async" [unread]="unread$ | async" />
    </div>
  `,
  styles: [`
    :host { display: block; }
    .shell {
      display: flex; flex-direction: column;
      max-width: var(--maxw); margin: 0 auto; min-height: 100vh;
      background: var(--surface-2);
    }
    .content { flex: 1 1 auto; }
  `],
})
export class ShellComponent {
  private store = inject(Store);
  private router = inject(Router);

  unread$ = this.store.select(selectUnreadNotif);
  active$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map((e) => {
      if (e.urlAfterRedirects.includes('/notifications')) return 'notif' as NavSection;
      if (e.urlAfterRedirects.includes('/profile')) return 'profile' as NavSection;
      return 'home' as NavSection;
    }),
    startWith('home' as NavSection),
  );
}
