import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { IracingApiWrapperService } from '../../services/iracing-api-wrapper.service';
import { AgGridModule } from 'ag-grid-angular';
import {
  ModuleRegistry,
  colorSchemeDark,
  colorSchemeDarkBlue,
  colorSchemeDarkWarm,
  colorSchemeLight,
  colorSchemeLightCold,
  colorSchemeLightWarm,
  colorSchemeVariable,
  iconSetAlpine,
  iconSetMaterial,
  iconSetQuartzBold,
  iconSetQuartzLight,
  iconSetQuartzRegular,
  themeAlpine,
  themeBalham,
  themeQuartz,
} from "ag-grid-community";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { recentRacesColumnDefs } from './recentRacesColumns';
import { Routes } from '@angular/router';
import { FormulaLeaderboardComponent } from '../formula-leaderboard/formula-leaderboard.component';
import { SportsCarLeaderboardComponent } from '../sports-car-leaderboard/sports-car-leaderboard.component';
import { DriverStatsLookupComponent } from '../driver-stats-lookup/driver-stats-lookup.component';

@Component({
  selector: 'app-display-data',
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule,
    MatToolbarModule,
    MatTabsModule,
    RouterModule,
    FormulaLeaderboardComponent,
    SportsCarLeaderboardComponent,
    DriverStatsLookupComponent
  ],
  templateUrl: './display-data.component.html',
  styleUrl: './display-data.component.scss',
  providers: [HttpClient, IracingApiWrapperService] // Add HttpClient to providers
})
export class DisplayDataComponent {
  columnDefs: any[] = recentRacesColumnDefs;
  rowData: any[] = [];
  defaultColDef = { sortable: true, filter: true, resizable: true };
  customerId: number | null = null;

  baseThemes = [
    { id: "themeQuartz", value: themeQuartz },
    { id: "themeBalham", value: themeBalham },
    { id: "themeAlpine", value: themeAlpine },
  ];
  baseTheme = themeQuartz;

  colorSchemes = [
    { id: "(unchanged)", value: null },
    { id: "colorSchemeLight", value: colorSchemeLight },
    { id: "colorSchemeLightCold", value: colorSchemeLightCold },
    { id: "colorSchemeLightWarm", value: colorSchemeLightWarm },
    { id: "colorSchemeDark", value: colorSchemeDark },
    { id: "colorSchemeDarkWarm", value: colorSchemeDarkWarm },
    { id: "colorSchemeDarkBlue", value: colorSchemeDarkBlue },
    { id: "colorSchemeVariable", value: colorSchemeVariable },
  ];
  colorScheme = colorSchemeDarkBlue

  iconSets = [
    { id: "(unchanged)", value: null },
    { id: "iconSetQuartzLight", value: iconSetQuartzLight },
    { id: "iconSetQuartzRegular", value: iconSetQuartzRegular },
    { id: "iconSetQuartzBold", value: iconSetQuartzBold },
    { id: "iconSetAlpine", value: iconSetAlpine },
    { id: "iconSetMaterial", value: iconSetMaterial },
  ];
  iconSet = iconSetMaterial

  get theme() {
    let theme = this.baseTheme;
    if (this.iconSet) {
      theme = theme.withPart(this.iconSet);
    }
    if (this.colorScheme) {
      theme = theme.withPart(this.colorScheme);
    }
    return theme;
  }


  constructor(private router: Router, private http: HttpClient, private iracingService: IracingApiWrapperService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('Here is my cust_id:', localStorage.getItem('cust_id'));
    const cust_id_str = localStorage.getItem('cust_id');
    const cust_id = cust_id_str ? parseInt(cust_id_str, 10) : null;
    if (cust_id !== null) {
      this.iracingService.getRecentRaces(cust_id).subscribe((data: any) => {
        console.log(data);
        this.rowData = Array.isArray(data) ? data : ((data as any)?.body?.races || []);
        // Do NOT set columnDefs here for now
        console.log(this.rowData);
        this.customerId = cust_id; // Store the customer ID for later use
      });
    } else {
      console.warn('cust_id is null, cannot fetch recent races.');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  // onTabChange(index: number) {
  //   if (index === 1) {
  //     this.router.navigate(['formula-leaderboard'], { relativeTo: this.route });
  //   } else if (index === 0) {
  //     this.router.navigate(['.'], { relativeTo: this.route });
  //   }
  // }
}

