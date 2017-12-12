import { TestBed, inject } from '@angular/core/testing';

import { PragccService } from './pragcc.service';

describe('PragccService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PragccService]
    });
  });

  it('should be created', inject([PragccService], (service: PragccService) => {
    expect(service).toBeTruthy();
  }));
});
