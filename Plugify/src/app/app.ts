import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public router: Router) {}
  
  get isDashboard(): boolean {
    return this.router.url === '/dashboard';
  }

  get isNba(): boolean {
    return this.router.url.startsWith('/nba');
  }

  get isLogin():boolean {
    return this.router.url.startsWith('/login') || this.router.url.startsWith('/signUp');
  }
}
