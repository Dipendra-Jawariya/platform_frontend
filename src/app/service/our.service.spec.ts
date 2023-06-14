import { TestBed } from '@angular/core/testing';

import { OurService } from './our.service';

describe('OurService', () => {
  let service: OurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
