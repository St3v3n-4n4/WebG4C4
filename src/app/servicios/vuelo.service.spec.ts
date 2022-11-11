import { TestBed } from '@angular/core/testing';

import { VueloService } from './vuelo.service';

describe('VueloService', () => {
  let service: VueloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VueloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
