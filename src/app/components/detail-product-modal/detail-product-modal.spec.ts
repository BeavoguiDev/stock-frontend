import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductModal } from './detail-product-modal';

describe('DetailProductModal', () => {
  let component: DetailProductModal;
  let fixture: ComponentFixture<DetailProductModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailProductModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProductModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
