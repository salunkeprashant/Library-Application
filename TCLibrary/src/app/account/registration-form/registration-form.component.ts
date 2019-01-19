import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-registration-form',
  templateUrl: '../../../view/registration-form.component.html'
})
export class RegistrationFormComponent implements OnInit {
  submitted = false;
  disableBtn = true;

  registrationForm = this.formBuilder.group({
    password: [null, Validators.compose([
      // 1. Password Field is Required
      Validators.required,
      // 2. check whether the entered password has a number
      this.patternValidator(/\d/, { hasNumber: true }),
      // 3. check whether the entered password has upper case letter
      this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      // 4. check whether the entered password has a lower-case letter
      this.patternValidator(/[a-z]/, { hasSmallCase: true }),
      // 5. check whether the entered password has a special character
      this.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
      // 6. Has a minimum length of 8 characters
      Validators.minLength(8)])
    ],
    confirmPassword: [null, Validators.compose([Validators.required])],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  },  // check whether our password and confirm password match
    { validator: this.passwordMatchValidator });

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }

  errors: string;
  busyPromise: Promise<any>;
  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.registrationForm.valueChanges
      .subscribe((changedObj: any) => {
        this.disableBtn = this.registrationForm.invalid;
      });
  }

  // convenience getter for easy access to form fields
  get regForm() { return this.registrationForm.controls; }

  registerUser() {
    this.submitted = true;
    let value = this.registrationForm.value;
    if (!this.registrationForm.invalid) {
      this.busyPromise = this.userService.register(value.email, value.password, value.firstName, value.lastName, value.confirmpassword)
        .toPromise().then(result => {
          if (result) {
            this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
          }
        },
        errors => this.errors = errors);
    }
  }
}
