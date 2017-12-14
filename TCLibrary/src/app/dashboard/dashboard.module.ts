import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/modules/shared.module';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

import { routing } from './dashboard.routing';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { MemberComponent } from './member/member.component';
import { MemberRootComponent } from './root/member.root.component';
import { ModalComponent } from '../directives/modal.component'
import { TransactionComponent } from './transaction/transaction.component'
import { ReturnComponent } from './transaction/return.component'

import { EmailValidator } from '../directives/email.validator.directive';
import { ModalService } from '../dashboard/services/modal.service'
import { FilterPipe} from '../dashboard/services/filterPipe'
import { DashboardService } from './services/dashboard.service';
import { AuthGuard } from '../auth.guard';

@NgModule({
    imports: [

        NgSelectModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        routing,
        SharedModule],
    declarations: [
        ModalComponent,
        RootComponent,
        HomeComponent,
        BookComponent,
        TransactionComponent,
        ReturnComponent,
        MemberRootComponent,
        MemberComponent,
        FilterPipe
    ],
    exports: [ModalComponent, FilterPipe],
    providers: [AuthGuard, DashboardService, EmailValidator, ModalService]
})
export class DashboardModule { }
