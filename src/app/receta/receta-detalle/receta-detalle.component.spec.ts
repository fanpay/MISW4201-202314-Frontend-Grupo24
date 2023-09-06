/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { Receta } from '../receta';

import { RecetaDetalleComponent } from './receta-detalle.component';

describe('RecetaDetalleComponent', () => {
  let component: RecetaDetalleComponent;
  let fixture: ComponentFixture<RecetaDetalleComponent>;
  let toastrService: ToastrService;
  let formBuilder: FormBuilder;

  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), HttpClientModule, RouterTestingModule],
      declarations: [ RecetaDetalleComponent ],
      providers: [

        FormBuilder,
        ToastrService]
    })
    .compileComponents();
  });

  beforeEach(async() => {
    fixture = TestBed.createComponent(RecetaDetalleComponent);

    component = fixture.componentInstance;
    component.recetaDetalle = new Receta(1, 'Test1', 10, 100, "test");
    component.ngOnInit();

    await fixture.whenStable();
    fixture.detectChanges();

    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    spyOn(toastrService, 'success');

    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
