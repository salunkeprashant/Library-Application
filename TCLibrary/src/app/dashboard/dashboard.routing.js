"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var root_component_1 = require("./root/root.component");
var home_component_1 = require("./home/home.component");
var book_component_1 = require("./book/book.component");
var member_component_1 = require("./member/member.component");
var transaction_component_1 = require("./transaction/transaction.component");
var return_component_1 = require("./transaction/return.component");
var auth_guard_1 = require("../auth.guard");
exports.routing = router_1.RouterModule.forChild([
    {
        path: 'dashboard',
        component: root_component_1.RootComponent, canActivate: [auth_guard_1.AuthGuard],
        children: [
            { path: '', component: home_component_1.HomeComponent },
            { path: 'home', component: home_component_1.HomeComponent },
            { path: 'transaction', component: transaction_component_1.TransactionComponent },
            { path: 'return', component: return_component_1.ReturnComponent },
            { path: 'book', component: book_component_1.BookComponent },
            { path: 'members', component: member_component_1.MemberComponent },
        ]
    },
]);
//# sourceMappingURL=dashboard.routing.js.map