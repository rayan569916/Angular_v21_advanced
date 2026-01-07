import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nba.dashboard.component',
  standalone: true, 
  imports: [],
  templateUrl: './nba.dashboard.component.html',
  styleUrl: './nba.dashboard.component.css',
})
export class NbaDashboardComponent {
  constructor(private router: Router){}

  ngOnInit(){
    // this.getPlayerDetails()
  }

  loadNbaPlayers(){
    this.router.navigate(['/nba/nbaPlayerDetail']);
  }

  loadNbaTeams(){
    this.router.navigate(['/nba/nbaTeamDetail']);
  }
}
