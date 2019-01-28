import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgBusyModule } from 'ng-busy';
import { SharedModule } from '../shared/modules/shared.module';

import { UserService } from '../shared/services/user.service';

import { EmailValidator } from '../directives/email.validator.directive';

import { routing } from './account.routing';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
    imports: [
      CommonModule, FormsModule, routing, SharedModule,
      BrowserAnimationsModule,
      NgBusyModule,
      ReactiveFormsModule
    ],
    declarations: [RegistrationFormComponent, EmailValidator],
    providers: [UserService]
})
export class AccountModule { }
