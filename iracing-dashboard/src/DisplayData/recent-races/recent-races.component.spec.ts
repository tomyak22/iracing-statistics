import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentRacesComponent } from './recent-races.component';

describe('RecentRacesComponent', () => {
  let component: RecentRacesComponent;
  let fixture: ComponentFixture<RecentRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentRacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
