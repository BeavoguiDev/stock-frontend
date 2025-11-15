import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStore } from './manage-store';

describe('ManageStore', () => {
  let component: ManageStore;
  let fixture: ComponentFixture<ManageStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
