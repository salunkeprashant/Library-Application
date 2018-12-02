import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/modules/shared.module';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { NgbModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { routing } from './dashboard.routing';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { MemberComponent } from './member/member.component';
import { MemberRootComponent } from './root/member.root.component';
import { TransactionComponent } from './transaction/transaction.component'
import { ReturnComponent } from './transaction/return.component'

import { EmailValidator } from '../directives/email.validator.directive';
import { FilterPipe } from '../dashboard/services/filterPipe'
import { DashboardService } from './services/dashboard.service';
import { AuthGuard } from '../auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgBusyModule } from 'ng-busy';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    NgSelectModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
    DataTablesModule,
    SharedModule,
    BrowserAnimationsModule,
    NgBusyModule],
  declarations: [
    RootComponent,
    HomeComponent,
    BookComponent,
    TransactionComponent,
    ReturnComponent,
    MemberRootComponent,
    MemberComponent,
    FilterPipe
  ],
  exports: [FilterPipe],
  providers: [AuthGuard, DashboardService, EmailValidator]
})
export class DashboardModule { }
