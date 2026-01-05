import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard.component';
import { App } from './app';

export const routes: Routes = [
    { path: '', component: App },
    {path: 'dashboard', component: Dashboard}
];
