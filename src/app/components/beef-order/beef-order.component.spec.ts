import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeefOrderComponent } from './beef-order.component';

describe('BeefOrderComponent', () => {
  let component: BeefOrderComponent;
  let fixture: ComponentFixture<BeefOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeefOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeefOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
