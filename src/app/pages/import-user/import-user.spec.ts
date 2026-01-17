import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportUser } from './import-user';

describe('ImportUser', () => {
  let component: ImportUser;
  let fixture: ComponentFixture<ImportUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
