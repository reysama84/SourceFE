import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import * as AuthActions from '../../../state/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../../state/auth/auth.selectors';

@Component({
  selector: 'sp-login',
  standalone: true,
  imports: [ReactiveFormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="login-page">
      <div class="login-head has-vec">
        <div class="logo">SP</div>
        <h1>Masuk ke Sales Point</h1>
        <p>Akun agen Mini ATM VisioNet</p>
      </div>

      <form class="sheet" [formGroup]="form" (ngSubmit)="submit()">
        @if (error()) {
          <div class="alert" role="alert">
            <sp-icon name="alert" [size]="16" />
            <span>{{ error() }}</span>
          </div>
        }

        <div class="field">
          <label for="lu">Username <span class="req">*</span></label>
          <div class="input-wrap">
            <sp-icon name="user" [size]="18" />
            <input id="lu" type="text" autocomplete="username" formControlName="username"
              placeholder="rizky.pratama" />
          </div>
          @if (invalid('username')) { <small class="err">Username wajib diisi.</small> }
        </div>

        <div class="field">
          <label for="lp">Kata Sandi <span class="req">*</span></label>
          <div class="input-wrap">
            <sp-icon name="lock" [size]="18" />
            <input id="lp" [type]="showPwd() ? 'text' : 'password'"
              autocomplete="current-password" formControlName="password"
              placeholder="••••••••" />
            <button type="button" class="eye"
              [attr.aria-label]="showPwd() ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
              (click)="showPwd.set(!showPwd())">
              <sp-icon [name]="showPwd() ? 'eyeOff' : 'eye'" [size]="18" />
            </button>
          </div>
          @if (invalid('password')) { <small class="err">Kata sandi wajib diisi.</small> }
        </div>

        <div class="checkline">
          <label class="checkbox">
            <input type="checkbox" formControlName="remember" />
            <span>Ingat saya</span>
          </label>
          <button type="button" class="link" (click)="forgot()">Lupa kata sandi?</button>
        </div>

        <button type="submit" class="btn primary" [disabled]="loading() || form.invalid">
          @if (loading()) { <span class="spinner" /> }
          <span>Masuk</span>
          <sp-icon name="arrowRight" [size]="18" />
        </button>

        <p class="demo-note">Demo: <b>rizky.pratama</b> / <b>salespoint</b></p>
      </form>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .login-page { min-height: 100vh; background: var(--surface-2); }
    .login-head {
      background: linear-gradient(135deg, var(--navy-1), var(--navy-2));
      color: #fff; padding: 48px 24px 64px; text-align: center;
      border-radius: 0 0 var(--r-lg) var(--r-lg);
    }
    .logo {
      width: 64px; height: 64px; margin: 0 auto 12px;
      background: var(--orange); color: #fff; font-weight: 800;
      border-radius: var(--r-md); display: flex; align-items: center; justify-content: center;
    }
    .login-head h1 { margin: 0; font-size: var(--fs-xl); }
    .login-head p { margin: 4px 0 0; opacity: .8; font-size: var(--fs-sm); }
    .sheet {
      background: var(--surface); margin: -32px 16px 0;
      padding: 20px; border-radius: var(--r-lg); box-shadow: var(--shadow);
    }
    .alert {
      display: flex; align-items: center; gap: 8px;
      background: #fdecec; color: var(--crit);
      padding: 10px 12px; border-radius: var(--r-sm); margin-bottom: 14px;
      font-size: var(--fs-sm);
    }
    .field { margin-bottom: 14px; }
    .field label { display: block; font-size: var(--fs-sm); font-weight: 600; margin-bottom: 6px; }
    .req { color: var(--crit); }
    .input-wrap {
      display: flex; align-items: center; gap: 8px;
      border: 1px solid var(--border); border-radius: var(--r-sm);
      padding: 0 12px; background: var(--surface-2);
    }
    .input-wrap sp-icon { color: #6b7a93; flex-shrink: 0; }
    .input-wrap input {
      flex: 1; border: none; background: transparent; padding: 12px 0; font-size: var(--fs-md);
      outline: none;
    }
    .eye { background: none; border: none; color: #6b7a93; padding: 4px; }
    .err { color: var(--crit); font-size: var(--fs-xs); display: block; margin-top: 4px; }
    .checkline {
      display: flex; align-items: center; justify-content: space-between; margin: 16px 0;
    }
    .checkbox { display: inline-flex; align-items: center; gap: 6px; font-size: var(--fs-sm); cursor: pointer; }
    .link { background: none; border: none; color: var(--accent); font-size: var(--fs-sm); }
    .btn.primary {
      width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
      background: var(--accent); color: #fff; border: none; padding: 14px;
      border-radius: var(--r-sm); font-weight: 700; font-size: var(--fs-md);
    }
    .btn.primary:disabled { opacity: .55; cursor: not-allowed; }
    .spinner {
      width: 14px; height: 14px; border: 2px solid rgba(255,255,255,.4);
      border-top-color: #fff; border-radius: 50%; animation: sp 0.8s linear infinite;
    }
    @keyframes sp { to { transform: rotate(360deg); } }
    .demo-note { text-align: center; font-size: var(--fs-xs); color: #6b7a93; margin: 16px 0 0; }
  `],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: [true],
  });

  showPwd = signal(false);
  loading = this.store.selectSignal(selectAuthLoading);
  error = this.store.selectSignal(selectAuthError);

  invalid(ctrl: string): boolean {
    const c = this.form.get(ctrl)!;
    return c.invalid && (c.dirty || c.touched);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { username, password } = this.form.getRawValue();
    this.store.dispatch(AuthActions.login({ username: username!, password: password! }));
  }

  forgot(): void {
    alert('Hubungi supervisor area untuk reset kata sandi.');
  }
}
