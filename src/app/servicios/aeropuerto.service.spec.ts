import { TestBed } from '@angular/core/testing';

import { AeropuertoService } from './aeropuerto.service';

describe('AeropuertoService', () => {
  let service: AeropuertoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AeropuertoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
