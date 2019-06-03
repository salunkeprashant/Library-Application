import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RootComponent } from './root/root.component';

import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { MemberComponent } from './member/member.component';
import { TransactionComponent } from './transaction/transaction.component'
import { ReturnComponent } from './transaction/return.component'

import { AuthGuard } from '../auth.guard';

export const routing: ModuleWithProviders = RouterModule.forChild([

    {
        path: 'dashboard',
        component: RootComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'transaction', component: TransactionComponent },
            { path: 'return', component: ReturnComponent },
            { path: 'book', component: BookComponent },
            { path: 'members', component: MemberComponent },
        ]
    },
]);

