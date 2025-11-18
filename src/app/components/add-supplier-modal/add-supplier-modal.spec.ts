import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierModal } from './add-supplier-modal';

describe('AddSupplierModal', () => {
  let component: AddSupplierModal;
  let fixture: ComponentFixture<AddSupplierModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSupplierModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSupplierModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
