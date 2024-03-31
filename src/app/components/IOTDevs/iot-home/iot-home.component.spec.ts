import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotHomeComponent } from './iot-home.component';

describe('IotHomeComponent', () => {
  let component: IotHomeComponent;
  let fixture: ComponentFixture<IotHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IotHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IotHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
