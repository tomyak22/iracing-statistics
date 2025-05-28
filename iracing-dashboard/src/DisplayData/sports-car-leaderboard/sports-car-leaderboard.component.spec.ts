import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsCarLeaderboardComponent } from './sports-car-leaderboard.component';

describe('SportsCarLeaderboardComponent', () => {
  let component: SportsCarLeaderboardComponent;
  let fixture: ComponentFixture<SportsCarLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsCarLeaderboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsCarLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
