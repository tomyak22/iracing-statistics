import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayDataComponent } from '../DisplayData/display-data/display-data.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'login', component: AppComponent },       // Route for the login component
    { path: 'display-data', component: DisplayDataComponent }, // Route for the display-data component
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }