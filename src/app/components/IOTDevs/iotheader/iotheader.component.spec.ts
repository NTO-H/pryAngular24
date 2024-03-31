import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotheaderComponent } from './iotheader.component';

describe('IotheaderComponent', () => {
  let component: IotheaderComponent;
  let fixture: ComponentFixture<IotheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IotheaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IotheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
