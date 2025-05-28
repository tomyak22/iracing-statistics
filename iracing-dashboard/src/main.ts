import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Route, RouterModule } from '@angular/router';
import { DisplayDataComponent } from './DisplayData/display-data/display-data.component';
import { LoginComponent } from './app/login/login.component';
import { importProvidersFrom, NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { FormulaLeaderboardComponent } from './DisplayData/formula-leaderboard/formula-leaderboard.component';

ModuleRegistry.registerModules([AllCommunityModule]);
export const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'display-data', component: DisplayDataComponent },
  { path: 'display-data/formula-leaderboard', component: FormulaLeaderboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      AgGridModule
    ), // Use importProvidersFrom
  ]
}).catch((err) => console.error(err));

