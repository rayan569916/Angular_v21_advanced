import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/login.component/login.component';
import { SignupComponent } from './features/signup.component/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path:'login' , component: LoginComponent},
    { path:'signUp', component: SignupComponent},
    { path: 'dashboard', component: Dashboard },
    {
        path: 'nba', loadChildren: ()=>
            import('./features/nba.routes').then(m=>m.nbaRoutes)
    }
];
