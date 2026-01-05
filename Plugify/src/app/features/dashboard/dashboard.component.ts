import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nba } from '../../services/nba';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class Dashboard {
  title = 'Dashboard';
  constructor(private nbaService: Nba){}

  ngOnInit(){
    this.nbaService.getPlayerDetails().subscribe(res => {
      console.log(res.data);
    })
  }
}
