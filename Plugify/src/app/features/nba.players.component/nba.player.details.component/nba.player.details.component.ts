import { Component,OnInit, computed, signal, effect} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nba } from '../../../services/nba';
import { player,player_detail,team } from '../../interface';
import  players from '../../../../assets/players.json';
import  teams from '../../../../assets/teams.json';
import  player_details from '../../../../assets/player_details.json'

@Component({
  selector: 'app-nba.player.details.component',
  imports: [],
  templateUrl: './nba.player.details.component.html',
  styleUrl: './nba.player.details.component.css',
})
export class NbaPlayerDetailsComponent implements OnInit{
  players=signal<player[]>(players);
  playerDetail=signal<player_detail[]>(player_details as player_detail[]);
  teamName:any="";
  playerSummary=signal<string>("")

  constructor(private nbaService: Nba, private activeRoute:ActivatedRoute) {}

  ngOnInit(){
    
  }

  selectedPlayer= computed<player|null>(()=>{
    const playerId=Number(this.activeRoute.snapshot.paramMap.get('playerId'));
    return this.players().find(p=>p.playerId==playerId) ?? null;
  })

  playerExtraDetails= computed<player_detail|null>(()=>{
    const playerId=Number(this.activeRoute.snapshot.paramMap.get('playerId'));
    const player=this.players().find(p=>p.playerId==playerId);
    if (!player) return null;
    const playerFullName=`${player.firstName} ${player.lastName}`;
    return this.playerDetail().find(i=>i.player_name==playerFullName) ?? null;
  })

  getPlayerSummaryEffect=effect(()=>{
    const playerName=this.playerExtraDetails()?.player_name.replaceAll(' ',"_") ?? "";
    this.nbaService.getPlayerSummaryFromWikipedia(playerName).subscribe(res=>{
      this.playerSummary.set(res.extract);
    });   
  })

  getPlayerMediaListEffect=effect(()=>{
    const playerName=this.playerExtraDetails()?.player_name.replaceAll(' ',"_") ?? "";
    this.nbaService.getPlayerMediaListFromWikipedia(playerName).subscribe(res=>{
    }); 
  })

    //   {
    //   title: 'File:Steven_Adams_(51813714196)_(cropped).jpg',
    //   leadImage: true,
    //   section_id: 0,
    //   type: 'image',
    //   showInGallery: true,
    //   srcset: [Array]
    // }



  private getPlayerMediaListFromWikipedia(): any { 
    const playerName=this.playerExtraDetails()?.player_name.replaceAll(' ',"_") ?? "";
    this.nbaService.getPlayerMediaListFromWikipedia(playerName).subscribe(res=>{
      console.log(res.items);
    });
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

  getTeamImage(team_abbreviation: any){
    const teamAbbreviation=team_abbreviation;
    if (!teamAbbreviation){
      return `free_agent.png`;
    }
    const allTeam=teams;
    const selectedTeam=allTeam.find(p=>p.abbreviation==teamAbbreviation) ?? null;
    if (!teamAbbreviation){
      return `teamId.png`;
    }
    this.teamName=selectedTeam?.teamName;
    return `https://cdn.nba.com/logos/nba/${selectedTeam?.teamId}/primary/L/logo.svg`;
  }

    size = 100;       // diameter
    strokeWidth = 16;

    radius = computed(() => (this.size - this.strokeWidth) / 2);
    circumference = computed(() => 2 * Math.PI * this.radius());

    gpDashOffset = computed(() => {
      const gp=this.playerExtraDetails()?.gp ?? 0;
      const percent=gp/82*100;
      return this.circumference() * (1 - percent / 100);
    });

    pntDashOffset = computed(() => {
      const pts=this.playerExtraDetails()?.pts ?? 0;
      const percent=(pts/38)*100;
      return this.circumference() * (1 - percent / 100);
    });

    rebDashOffset = computed(() => {
      const reb=this.playerExtraDetails()?.reb ?? 0;
      const percent=reb/15*100;
      return this.circumference() * (1 - percent / 100);
    });

    astDashOffset = computed(() => {
      const ast=this.playerExtraDetails()?.ast ?? 0;
      const percent=ast/14.5*100;
      return this.circumference() * (1 - percent / 100);
    });

    netDashOffset = computed(() => {
      const net_rating=this.playerExtraDetails()?.net_rating ?? 0;
      const percent=net_rating/17.4*100;
      return this.circumference() * (1 - percent / 100);
    });

    styleStrokeColourPrimary(percentage:string){
      if (percentage=='gpDashOffset'){
      const gp=this.playerExtraDetails()?.gp ?? 0;
      const percent=gp/82*100;
        return this.styleStrokeColourSecondary(percent);
      }
      else if (percentage=='pntDashOffset'){
      const pts=this.playerExtraDetails()?.pts ?? 0;
      const percent=(pts/38)*100;
        return this.styleStrokeColourSecondary(percent);
      }
      else if (percentage=='rebDashOffset'){
      const reb=this.playerExtraDetails()?.reb ?? 0;
      const percent=reb/15*100;
        return this.styleStrokeColourSecondary(percent);
      }
      else if (percentage=='astDashOffset'){
      const ast=this.playerExtraDetails()?.ast ?? 0;
      const percent=ast/14.5*100;
        return this.styleStrokeColourSecondary(percent);
      }
      else if (percentage=='netDashOffset'){
      const net_rating=this.playerExtraDetails()?.net_rating ?? 0;
      const percent=net_rating/17.4*100;
        return this.styleStrokeColourSecondary(percent);
      }
      return "stroke: #6f5ef9; color: #6f5ef9";
    }

    styleStrokeColourSecondary(percent:number){
      if (percent<=25){
        return "stroke: #bdd7e7; color: #bdd7e7;";
      }
      else if (percent<=50 && percent>25){
        return "stroke: #6baed6; color: #6baed6;";
      }
      else if (percent<=75 && percent>50){
        return "stroke: #0593ffff; color: #0593ffff;";
      }
      else if (percent<=100 && percent>75){
        return "stroke: #3182bd; color: #3182bd;";
      }
      return "stroke: #08519c; color: #08519c;";
    }

  // private getPlayerMobileSectionsFromWikipedia(): any {
  //   this.nbaService.getPlayerMobileSectionsFromWikipedia("LeBron_James").subscribe(html=>{
  //     console.log(this.sanitizer.bypassSecurityTrustHtml(html))
  //   });
  //}
}
