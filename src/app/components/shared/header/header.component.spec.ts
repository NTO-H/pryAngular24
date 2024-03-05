import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListarProductosComponent } from '../../Admin/producto/listar-productos/listar-productos.component';
import { HeaderComponent } from './header.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('ListarProductosComponent', () => {
  let component: ListarProductosComponent;
  let fixture: ComponentFixture<ListarProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarProductosComponent]
    });
    fixture = TestBed.createComponent(ListarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',  () => {
    expect(component).toBeTruthy();
  });
});
