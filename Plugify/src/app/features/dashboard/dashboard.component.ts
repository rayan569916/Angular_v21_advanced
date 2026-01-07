import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class Dashboard {
  constructor(private router:Router){}

  loadNbaDashboard(){
    this.router.navigate(['/nba/nbaDashboard']);
  }
}
