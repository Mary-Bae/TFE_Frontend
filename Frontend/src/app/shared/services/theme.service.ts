import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private colorTheme: 'light' | 'dark' = 'light';
  private prefix = 'color-scheme-';
  constructor() { }

  load() {
    const saved = localStorage.getItem('prefers-color');
    this.colorTheme = (saved === 'dark' || saved === 'light') ? saved : 'light';
    document.body.classList.add(this.prefix + this.colorTheme);
  }

  update(scheme: 'light' | 'dark') {
    document.body.classList.remove(this.prefix + this.colorTheme);
    this.colorTheme = scheme;
    localStorage.setItem('prefers-color', scheme);
    document.body.classList.add(this.prefix + scheme);
  }

  currentActive() {
    return this.colorTheme;
  }
}
