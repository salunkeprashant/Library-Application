import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';

import { routing } from './dashboard.routing';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { ModalComponent } from '../directives/modal.component'
import { ModalService } from '../dashboard/services/modal.service'

import { DashboardService } from './services/dashboard.service';

import { AuthGuard } from '../auth.guard';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing,
        SharedModule],
    declarations: [
        ModalComponent,
        RootComponent,
        HomeComponent,
        BookComponent,
    ],
    exports: [ModalComponent],
    providers: [AuthGuard, DashboardService, ModalService]
})
export class DashboardModule { }
