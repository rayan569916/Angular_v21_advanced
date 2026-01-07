import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard.component';
import { NbaDashboardComponent } from './features/nba.dashboard.component/nba.dashboard.component';
import { NbaPlayersComponent } from './features/nba.players.component/nba.players.component';
import {NbaTeamsComponent} from './features/nba.teams.component/nba.teams.component'
export const routes: Routes = [
    { path:'',redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: Dashboard },
    {path: 'nba', children: [
        { path: '', redirectTo: 'nbaDashboard', pathMatch: 'full' },
        { path: 'nbaDashboard', component: NbaDashboardComponent },
        { path: 'nbaPlayerDetail', component: NbaPlayersComponent},
        { path: 'nbaTeamDetail', component: NbaTeamsComponent}
    ]}

];
