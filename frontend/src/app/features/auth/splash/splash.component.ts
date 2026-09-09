import { Component, ChangeDetectionStrategy, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'sp-splash',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="splash" role="status" aria-live="polite">
      <div class="brand">
        <div class="logo-mark">SP</div>
        <div class="divider"></div>
        <h1 class="title">SALES POINT</h1>
        <p class="tagline">Aplikasi akuisisi agen Mini ATM di lapangan</p>
      </div>
      <div class="dots" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <footer>VisioNet Mini ATM · v1.0.0</footer>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .splash {
      min-height: 100vh; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      background: radial-gradient(circle at 50% 30%, var(--navy-2), var(--navy-1));
      color: #fff; text-align: center; padding: 24px;
      animation: rise 0.6s ease both;
    }
    @keyframes rise {
      from { opacity: 0; transform: translateY(10px) scale(.98); }
      to   { opacity: 1; transform: none; }
    }
    .logo-mark {
      width: 84px; height: 84px; border-radius: var(--r-lg);
      background: var(--orange); color: #fff; font-weight: 800;
      font-size: 32px; display: flex; align-items: center; justify-content: center;
      margin-bottom: 18px;
    }
    .divider { width: 52px; height: 3px; background: var(--orange); margin: 0 auto 14px; }
    .title { font-size: 26px; font-weight: 800; letter-spacing: 0.24em; margin: 0; }
    .tagline { margin: 8px 0 0; opacity: .82; font-size: var(--fs-sm); max-width: 260px; }
    .dots { display: flex; gap: 6px; margin: 32px 0; }
    .dots span {
      width: 8px; height: 8px; background: rgba(255,255,255,.7); border-radius: 50%;
      animation: bounce 1.2s infinite ease-in-out;
    }
    .dots span:nth-child(2) { animation-delay: 0.15s; }
    .dots span:nth-child(3) { animation-delay: 0.3s; }
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0.4); opacity: .4; }
      40% { transform: scale(1); opacity: 1; }
    }
    footer { position: absolute; bottom: 24px; font-size: var(--fs-xs); opacity: .6; }
  `],
})
export class SplashComponent implements OnDestroy {
  private auth = inject(AuthService);
  private router = inject(Router);
  private timer = setTimeout(() => {
    const user = this.auth.restoreSession();
    this.router.navigateByUrl(user ? '/loading' : '/auth/login');
  }, 2400);

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
