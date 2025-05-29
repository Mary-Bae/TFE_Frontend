import { TestBed } from '@angular/core/testing';

import { DemandesService } from '../shared/services/demandes.service';

describe('DemandesService', () => {
  let service: DemandesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
