import { BrowserModule } from '@angular/platform-browser';
import { Directive, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgBusyModule } from 'ng-busy';
import { ToasterContainerComponent, ToasterModule, ToasterService, ToasterConfig } from 'angular5-toaster';

/* App Root */
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AvailableBookComponent } from './public/availableBook.component';
import { FooterComponent } from './footer/footer.component';
import { LoginFormComponent } from './account/login-form/login-form.component';

/* Account Imports */
import { AccountModule } from './account/account.module';

/* Dashboard Imports */
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/modules/shared.module';

/* Service Imports */
import { ApiService } from './shared/utils/api.service';
import { HttpTokenInterceptor } from './shared/utils/http.token.interceptor';
import { BusyConfig } from 'ng-busy';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AvailableBookComponent,
    LoginFormComponent
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
    DataTablesModule,
    BrowserAnimationsModule,
    NgBusyModule,
    ToasterModule
  ],
  providers: [
    ApiService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpTokenInterceptor,
      multi: true
    },
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
