import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { routing } from './app.routing';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/* App Root */
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

/* Account Imports */
import { AccountModule } from './account/account.module';

/* Dashboard Imports */
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/modules/shared.module';
import { ConfigService } from './shared/utils/config.service';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
    ],
    imports: [
        NgbModule.forRoot(),
        CommonModule,
        AccountModule,
        DashboardModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        CommonModule,
        FormsModule,
        routing,
        SharedModule
    ],
    providers: [ConfigService, {
        provide: XHRBackend,
        useClass: AuthenticateXHRBackend
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
