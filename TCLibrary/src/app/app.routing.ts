﻿import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from '../register/index';
import { HomeComponent } from '../component/home.component';
import { LoginComponent } from '../component/login.component';
import { AuthGuard } from '../guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);