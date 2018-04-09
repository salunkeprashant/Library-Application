"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var shared_module_1 = require("../shared/modules/shared.module");
var ng_select_1 = require("@ng-select/ng-select");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular_datatables_1 = require("angular-datatables");
var dashboard_routing_1 = require("./dashboard.routing");
var root_component_1 = require("./root/root.component");
var home_component_1 = require("./home/home.component");
var book_component_1 = require("./book/book.component");
var member_component_1 = require("./member/member.component");
var member_root_component_1 = require("./root/member.root.component");
var transaction_component_1 = require("./transaction/transaction.component");
var return_component_1 = require("./transaction/return.component");
var email_validator_directive_1 = require("../directives/email.validator.directive");
var filterPipe_1 = require("../dashboard/services/filterPipe");
var dashboard_service_1 = require("./services/dashboard.service");
var auth_guard_1 = require("../auth.guard");
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                ng_bootstrap_1.NgbModule.forRoot(),
                ng_select_1.NgSelectModule,
                platform_browser_1.BrowserModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                dashboard_routing_1.routing,
                angular_datatables_1.DataTablesModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                root_component_1.RootComponent,
                home_component_1.HomeComponent,
                book_component_1.BookComponent,
                transaction_component_1.TransactionComponent,
                return_component_1.ReturnComponent,
                member_root_component_1.MemberRootComponent,
                member_component_1.MemberComponent,
                filterPipe_1.FilterPipe
            ],
            exports: [filterPipe_1.FilterPipe],
            providers: [auth_guard_1.AuthGuard, dashboard_service_1.DashboardService, email_validator_directive_1.EmailValidator]
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map