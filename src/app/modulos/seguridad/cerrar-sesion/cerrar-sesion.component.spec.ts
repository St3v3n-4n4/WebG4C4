import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarSesionComponent } from './cerrar-sesion.component';

describe('CerrarSesionComponent', () => {
  let component: CerrarSesionComponent;
  let fixture: ComponentFixture<CerrarSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CerrarSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerrarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
