import { TestBed } from '@angular/core/testing';

import { RutaService } from './ruta.service';

describe('RutaService', () => {
  let service: RutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
