import { Component } from '@angular/core';
import players from '../../../assets/players.json';
import teams from '../../../assets/teams.json'
import {player,team} from '../interface'

@Component({
  selector: 'app-nba.teams.component',
  imports: [],
  templateUrl: './nba.teams.component.html',
  styleUrl: './nba.teams.component.css',
})
export class NbaTeamsComponent {
  nbaTeams:team[] = teams;

  getTeamImage(team: team | null){
    const teamName=team?.teamName ?? '';
    const teamId=team?.teamId;
    if (!team){
      return `free_agent.png`;
    }
    return `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`;
  }

}
