import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPoliticasComponent } from './agregar-politicas.component';







describe('AgregarPoliticasComponent', () => {
  let component: AgregarPoliticasComponent;
  let fixture: ComponentFixture<AgregarPoliticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPoliticasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarPoliticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
