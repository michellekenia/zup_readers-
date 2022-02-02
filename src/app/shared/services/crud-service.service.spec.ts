import { TestBed } from '@angular/core/testing';

import { CrudServiceService } from './crud-service.service';

describe('CrudServiceService', () => {
  let service: CrudServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
function beforeEach(arg0: () => void) {
  throw new Error('Function not implemented.');
}

function expect(service: CrudServiceService) {
  throw new Error('Function not implemented.');
}

