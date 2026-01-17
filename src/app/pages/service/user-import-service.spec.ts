import { TestBed } from '@angular/core/testing';

import { UserImportService } from './user-import-service';

describe('UserImportService', () => {
  let service: UserImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
