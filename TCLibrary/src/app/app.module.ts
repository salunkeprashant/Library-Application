import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/* App Root */
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AvailableBookComponent } from './public/availableBook.component';
import { FooterComponent } from './footer/footer.component';

/* Account Imports */
import { AccountModule } from './account/account.module';

/* Dashboard Imports */
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/modules/shared.module';
import { ApiService } from './shared/utils/api.service';
import { HttpTokenInterceptor } from './shared/utils/http.token.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        AvailableBookComponent
    ],
    imports: [
        NgbModule.forRoot(),
        CommonModule,
        AccountModule,
        DashboardModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        CommonModule,
        FormsModule,
        SharedModule,
        DataTablesModule
    ],
    providers: [ApiService, {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpTokenInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
