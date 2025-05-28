import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IracingApiWrapperService } from '../../services/iracing-api-wrapper.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, startWith } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { recentRacesColumnDefs } from '../display-data/recentRacesColumns';

@Component({
  selector: 'app-driver-stats-lookup',
  templateUrl: './driver-stats-lookup.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    AgGridModule,
    ReactiveFormsModule
    // ...other modules
  ],
  styleUrl: './driver-stats-lookup.component.scss'
})
export class DriverStatsLookupComponent {
  searchControl = new FormControl('');
  filteredDrivers$: Observable<any[]>;
  currentDriver: any;

    columnDefs: any[] = recentRacesColumnDefs;
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

  constructor(private iracingService: IracingApiWrapperService) {
    this.filteredDrivers$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query =>
        query && query.length > 1
          ? this.iracingService.getMemberInfo(query).pipe(
              map(results =>
                Array.isArray(results.body)
                  ? results.body
                      .filter(item => !!item.display_name)
                      .slice(0, 25)
                  : []
              )
            )
          : of([])
      )
    );
  }

  onDriverSelected(driver: any) {
    this.currentDriver = driver;
    this.searchControl.setValue(driver.display_name, { emitEvent: false });
    console.log('Selected Driver:', this.currentDriver.cust_id);
    if (this.currentDriver !== null) {
      this.iracingService.getRecentRaces(this.currentDriver.cust_id).subscribe((data: any) => {
        console.log(data);
        this.rowData = Array.isArray(data) ? data : ((data as any)?.body?.races || []);
        // Do NOT set columnDefs here for now
        console.log(this.rowData);
      });
    } else {
      console.warn('cust_id is null, cannot fetch recent races.');
    }
  }
}
