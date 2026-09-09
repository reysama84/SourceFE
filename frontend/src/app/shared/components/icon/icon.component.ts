import {
  Component,
  ChangeDetectionStrategy,
  Input,
  inject,
  DomSanitizer,
  SafeHtml,
} from '@angular/core';

export const ICON_REGISTRY: Record<string, string> = {
  back: '<path d="M15 6l-6 6 6 6"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  bell: '<path d="M18 8.5a6 6 0 1 0-12 0c0 6-2.2 7.5-2.2 7.5h16.4S18 14.5 18 8.5Z"/><path d="M13.7 19.5a2 2 0 0 1-3.4 0"/>',
  home: '<path d="m3 10.5 9-7 9 7V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20Z"/><path d="M9.5 21.5v-7h5v7"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M3 3l18 18"/><path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17.5 17.5 0 0 1-3.3 4.2M6.6 6.6A17.3 17.3 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 4-.8"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  alert: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  tag: '<path d="M3 7v5l9 9 5-5-9-9H3Z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z"/><circle cx="12" cy="13" r="4"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
};

@Component({
  selector: 'sp-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      [style.width.px]="size"
      [style.height.px]="size"
      [innerHTML]="safe"
      aria-hidden="true"
    ></svg>
  `,
})
export class IconComponent {
  @Input({ required: true }) name = '';
  @Input() size = 22;
  private sanitizer = inject(DomSanitizer);

  get safe(): SafeHtml {
    const raw = ICON_REGISTRY[this.name] ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  }
}
