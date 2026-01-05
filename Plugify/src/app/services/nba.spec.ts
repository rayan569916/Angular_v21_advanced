import { TestBed } from '@angular/core/testing';

import { Nba } from './nba';

describe('Nba', () => {
  let service: Nba;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nba);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
