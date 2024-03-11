import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercaDeLaEmpresaComponent } from './acerca-de-la-empresa.component';

describe('AcercaDeLaEmpresaComponent', () => {
  let component: AcercaDeLaEmpresaComponent;
  let fixture: ComponentFixture<AcercaDeLaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcercaDeLaEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcercaDeLaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
