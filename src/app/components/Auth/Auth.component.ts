import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import {ButtonModule} from 'primeng/button';

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

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title Input with a custom ErrorStateMatcher */
// @Component({
//   selector: 'input-error-state-matcher-example',
//   templateUrl: './input-error-state-matcher-example.html',
//   styleUrl: './input-error-state-matcher-example.css',
//   standalone: true,
//   imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
// })
// export class InputErrorStateMatcherExample {
//   emailFormControl = new FormControl('', [Validators.required, Validators.email]);

//   matcher = new MyErrorStateMatcher();
// }

@Component({
  selector: 'app-Auth',
  templateUrl: './Auth.component.html',
  styleUrls: ['./Auth.component.css'],
  // standalone: true,
  // imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatButtonModule, MatDividerModule, MatIconModule],
})
export class AuthComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  value!: string;
  matcher = new MyErrorStateMatcher();
  constructor() { }
  inputControl: FormControl = new FormControl(''); 
  ngOnInit() {
    this.inputControl = new FormControl('');
  }
  
}
