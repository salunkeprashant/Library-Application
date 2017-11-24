import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from '../component/app.component';
import { routing } from './app.routing';

import { fakeBackendProvider } from '../helper/index';
import { AlertComponent } from '../component/alert.component';
import { AuthGuard } from '../guards/index';
import { AlertService, AuthenticationService, UserService } from '../services/index';
import { HomeComponent } from '../component/home.component';
import { LoginComponent } from '../component/login.component';
import { RegisterComponent } from '../register/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,

        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }