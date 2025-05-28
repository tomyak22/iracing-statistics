import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DisplayDataComponent } from '../DisplayData/display-data/display-data.component';
import { FormulaLeaderboardComponent } from '../DisplayData/formula-leaderboard/formula-leaderboard.component';

export const routes: Routes = [
    { path: 'login', component: AppComponent },
    {
        path: 'display-data',
        component: DisplayDataComponent,
        children: [
            { path: 'formula-leaderboard', component: FormulaLeaderboardComponent }
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
