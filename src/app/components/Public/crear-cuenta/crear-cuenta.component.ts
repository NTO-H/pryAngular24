import { Component, OnInit } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';

import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import {ButtonModule} from 'primeng/button';
// import * as anime from 'animejs';
// import { FormControl } from "@angular/forms";
// node_modules/animejs';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';




export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatButtonModule, MatDividerModule, MatIconModule,MatTabsModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.scss',
  

})
export class CrearCuentaComponent implements OnInit{

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passFormControl = new FormControl();

  // const pas1 = passFormControl.value;

  matcher = new MyErrorStateMatcher();
  constructor() { }
  inputControl: FormControl = new FormControl(''); 
  ngOnInit() {
    this.inputControl = new FormControl('');
  }

}
