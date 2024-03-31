import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDispositivosComponent } from './tabla-dispositivos.component';

describe('TablaDispositivosComponent', () => {
  let component: TablaDispositivosComponent;
  let fixture: ComponentFixture<TablaDispositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaDispositivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
