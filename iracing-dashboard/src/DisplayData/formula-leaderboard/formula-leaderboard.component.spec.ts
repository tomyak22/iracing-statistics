import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaLeaderboardComponent } from './formula-leaderboard.component';

describe('FormulaLeaderboardComponent', () => {
  let component: FormulaLeaderboardComponent;
  let fixture: ComponentFixture<FormulaLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaLeaderboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
