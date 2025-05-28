import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverStatsLookupComponent } from './driver-stats-lookup.component';

describe('DriverStatsLookupComponent', () => {
  let component: DriverStatsLookupComponent;
  let fixture: ComponentFixture<DriverStatsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverStatsLookupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverStatsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
