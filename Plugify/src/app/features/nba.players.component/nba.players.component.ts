import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Nba } from '../../services/nba';
import players from '../../../assets/players.json';
import teams from '../../../assets/teams.json'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import {player,team} from '../interface'


@Component({
  selector: 'app-nba.players.component',
  imports: [FormsModule,CommonModule],
  templateUrl: './nba.players.component.html',
  styleUrl: './nba.players.component.css',
})
export class NbaPlayersComponent implements OnInit{
  playerDetails = players;
  filterPlayerDetails:player[]=[]
  teamDetails:team[] = teams;
  playerTeam:any={};
  isOpen=false;
  selectedTeam: team | null =  null;
  searchText = '';
  constructor(private router: Router, private nbaService: Nba){}

  // getPlayerDetails(){
  //   this.nbaService.getPlayerDetails().subscribe(res=>{
  //     this.playerDetails=res.data;
  //   })
  // }
// }
  ngOnInit(){
    this.playersBasedonFilter(null);
  }
  loadplayerTeam(teamId:any){
    this.playerTeam= this.teamDetails.find(p=>p.teamId==teamId)
    return this.playerTeam?.teamName ?? 'Free agent'
  }

  getPlayerImage(player: any): string {
    const nbaPlayerId = player.playerId;

    if (nbaPlayerId){
      return `https://cdn.nba.com/headshots/nba/latest/260x190/${nbaPlayerId}.png`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      nbaPlayerId
    )}&background=0D6EFD&color=fff&size=256`;
  }

  getTeamImageForSearch(team: team | null){
    const teamName=team?.teamName ?? '';
    const teamId=team?.teamId;
    if (!team){
      return `free_agent.png`;
    }
    return `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`;
  }

  getTeamImageForCard(teamId:any){
    const team=this.teamDetails.find(p=>p.teamId==teamId) ?? null;
    return this.getTeamImageForSearch(team);
  }

  playersBasedonFilter(team:team | null){
    if (team==null){
      this.filterPlayerDetails=this.playerDetails;
    }
    else{
      this.filterPlayerDetails=this.playerDetails.filter(p=>p.teamId==team.teamId);
    }
  }

  clear() {
    this.selectedTeam = null;
    this.searchText = '';
    this.playersBasedonFilter(null);
  }

  select(team:team | null) {
    this.selectedTeam = team;
    this.isOpen = false;
    this.playersBasedonFilter(team)
  }
}
