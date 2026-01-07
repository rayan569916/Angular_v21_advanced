import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaTeamsComponent } from './nba.teams.component';

describe('NbaTeamsComponent', () => {
  let component: NbaTeamsComponent;
  let fixture: ComponentFixture<NbaTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbaTeamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbaTeamsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
