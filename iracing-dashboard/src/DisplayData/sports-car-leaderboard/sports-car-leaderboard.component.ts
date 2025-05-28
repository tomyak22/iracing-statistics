import { Component } from '@angular/core';
import { IracingApiWrapperService } from '../../services/iracing-api-wrapper.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { themeQuartz, themeBalham, themeAlpine, colorSchemeLight, colorSchemeLightCold, colorSchemeLightWarm, colorSchemeDark, colorSchemeDarkWarm, colorSchemeDarkBlue, colorSchemeVariable, iconSetQuartzLight, iconSetQuartzRegular, iconSetQuartzBold, iconSetAlpine, iconSetMaterial } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { classLeaderboardCols } from '../formula-leaderboard/formulaLeaderbordCols';

@Component({
  selector: 'app-sports-car-leaderboard',
  imports: [
    RouterModule,
    MatCardModule,
    HttpClientModule,
    AgGridModule
    // ...other modules
  ],
  templateUrl: './sports-car-leaderboard.component.html',
  styleUrl: './sports-car-leaderboard.component.scss'
})
export class SportsCarLeaderboardComponent {
  columnDefs: any[] = classLeaderboardCols;
      rowData: any[] = [];
      defaultColDef = { sortable: true, filter: true, resizable: true };
    
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
    

    constructor(private iracingService: IracingApiWrapperService, private http: HttpClient,) {}

    ngOnInit(): void {
    console.log('Here is my cust_id:', localStorage.getItem('cust_id'));
    const cust_id_str = localStorage.getItem('cust_id');
    const cust_id = cust_id_str ? parseInt(cust_id_str, 10) : null;
    if (cust_id !== null) {
      this.iracingService.getSportsCarLeaderboard().subscribe((response: any) => {
        this.rowData = response.drivers || (response.body && response.body.drivers) || [];
        console.log('Formula Leaderboard Data:', this.rowData);
      });
    } else {
      console.warn('cust_id is null, cannot fetch recent races.');
    }
  }
}
