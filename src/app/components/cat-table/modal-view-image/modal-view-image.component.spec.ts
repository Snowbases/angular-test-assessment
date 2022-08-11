import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewImageComponent } from './modal-view-image.component';

describe('ModalViewImageComponent', () => {
  let component: ModalViewImageComponent;
  let fixture: ComponentFixture<ModalViewImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
