import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'sp-app-bar',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="app-bar">
      <div class="bar-row">
        @if (showBack) {
          <button class="back-btn" (click)="onBack.emit()" aria-label="Kembali">
            <sp-icon name="back" [size]="22" />
          </button>
        }
        <div class="titles">
          <h1>{{ title }}</h1>
          @if (subtitle) { <p>{{ subtitle }}</p> }
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host { display: block; }
    .app-bar {
      background: linear-gradient(135deg, var(--navy-1), var(--navy-2));
      color: #fff;
      padding: 18px 16px 16px;
      border-radius: 0 0 var(--r-lg) var(--r-lg);
      box-shadow: var(--shadow);
    }
    .bar-row { display: flex; align-items: center; gap: 8px; }
    .back-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 36px; height: 36px; border: none; background: rgba(255,255,255,.12);
      color: #fff; border-radius: 50%;
    }
    .titles h1 { margin: 0; font-size: var(--fs-lg); font-weight: 700; letter-spacing: .01em; }
    .titles p { margin: 2px 0 0; font-size: var(--fs-xs); opacity: .78; }
  `],
})
export class AppBarComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() showBack = false;
  @Output() onBack = new EventEmitter<void>();
}
