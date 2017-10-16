import { TestBed, inject } from '@angular/core/testing';

import { CafileService } from './cafile.service';

describe('CafileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CafileService]
    });
  });

  it('should be created', inject([CafileService], (service: CafileService) => {
    expect(service).toBeTruthy();
  }));
});
