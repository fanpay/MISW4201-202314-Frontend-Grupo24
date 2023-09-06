/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { Receta } from '../receta';
import { AppComponent } from 'src/app/app.component';

import { RecetaEditarComponent } from './receta-editar.component';
import { RecetaService } from '../receta.service';
import { EncabezadoComponent } from 'src/app/encabezado-app/encabezado/encabezado.component';
import { IngredienteService } from 'src/app/ingrediente/ingrediente.service';
import { of } from 'rxjs';
import { Ingrediente } from 'src/app/ingrediente/ingrediente';

describe('RecetaEditarComponent', () => {
  let component: RecetaEditarComponent;
  let fixture: ComponentFixture<RecetaEditarComponent>;
  let ingredienteService: jasmine.SpyObj<IngredienteService>;
  let recetaService1: jasmine.SpyObj<RecetaService>;
  let recetaService2: jasmine.SpyObj<RecetaService>;
  let debug: DebugElement;

  beforeEach(async() => {
    ingredienteService = jasmine.createSpyObj<IngredienteService>('IngredienteService',['darIngredientes']);
    recetaService1 = jasmine.createSpyObj<RecetaService>('RecetaService',['darReceta']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), HttpClientModule, RouterTestingModule],
      declarations: [ EncabezadoComponent, RecetaEditarComponent ],
      providers: [
        {provide: RecetaService, useValue: recetaService1},
        {provide: IngredienteService, useValue: ingredienteService},
        FormBuilder,
        ToastrService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaEditarComponent);
    component = fixture.componentInstance;

    recetaService1 = TestBed.inject(RecetaService) as jasmine.SpyObj<RecetaService>;
    ingredienteService = TestBed.inject(IngredienteService) as jasmine.SpyObj<IngredienteService>;

    component.receta = new Receta(1, 'Test1', 10, 100, "test");

    const ingredientesMock = new Ingrediente(1, "test", "costal", 100, 10, "test", 1);

    component.listaIngredientes = [ingredientesMock];

    ingredienteService.darIngredientes.and.returnValue(of(component.listaIngredientes));
    recetaService1.darReceta.and.returnValue(of(component.receta));

    component.ngOnInit();

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
