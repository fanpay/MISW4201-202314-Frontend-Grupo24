/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { IngredienteEditarComponent } from './ingrediente-editar.component';
import { EncabezadoComponent } from 'src/app/encabezado-app/encabezado/encabezado.component';
import { IngredienteService } from '../ingrediente.service';
import { Ingrediente } from '../ingrediente';
import { of } from 'rxjs';

describe('IngredienteEditarComponent', () => {
  let component: IngredienteEditarComponent;
  let fixture: ComponentFixture<IngredienteEditarComponent>;
  let ingredienteService: jasmine.SpyObj<IngredienteService>;

  beforeEach(async(() => {
    ingredienteService = jasmine.createSpyObj<IngredienteService>('IngredienteService',['darIngrediente']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ToastrModule.forRoot(),RouterTestingModule, HttpClientModule],
      declarations: [ EncabezadoComponent, IngredienteEditarComponent ],
      providers: [
        {provide: IngredienteService, useValue: ingredienteService},
        FormBuilder,
        ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredienteEditarComponent);
    component = fixture.componentInstance;

    ingredienteService = TestBed.inject(IngredienteService) as jasmine.SpyObj<IngredienteService>;
    const ingredientesMock = new Ingrediente(1, "test", "costal", 100, 10, "test", 1);

    component.ingrediente = ingredientesMock;

    ingredienteService.darIngrediente.and.returnValue(of(component.ingrediente));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
