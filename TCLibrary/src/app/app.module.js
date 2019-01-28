"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var app_routing_1 = require("./app.routing");
var common_1 = require("@angular/common");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular_datatables_1 = require("angular-datatables");
var http_2 = require("@angular/common/http");
var animations_1 = require("@angular/platform-browser/animations");
var ng_busy_1 = require("ng-busy");
var angular5_toaster_1 = require("angular5-toaster");
/* App Root */
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var home_component_1 = require("./home/home.component");
var availableBook_component_1 = require("./public/availableBook.component");
var footer_component_1 = require("./footer/footer.component");
var login_form_component_1 = require("./account/login-form/login-form.component");
/* Account Imports */
var account_module_1 = require("./account/account.module");
/* Dashboard Imports */
var dashboard_module_1 = require("./dashboard/dashboard.module");
var shared_module_1 = require("./shared/modules/shared.module");
/* Service Imports */
var api_service_1 = require("./shared/utils/api.service");
var http_token_interceptor_1 = require("./shared/utils/http.token.interceptor");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                home_component_1.HomeComponent,
                availableBook_component_1.AvailableBookComponent,
                login_form_component_1.LoginFormComponent
            ],
            imports: [
                ng_bootstrap_1.NgbModule.forRoot(),
                common_1.CommonModule,
                account_module_1.AccountModule,
                dashboard_module_1.DashboardModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                app_routing_1.routing,
                common_1.CommonModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                angular_datatables_1.DataTablesModule,
                animations_1.BrowserAnimationsModule,
                ng_busy_1.NgBusyModule,
                angular5_toaster_1.ToasterModule
            ],
            providers: [
                api_service_1.ApiService, {
                    provide: http_2.HTTP_INTERCEPTORS,
                    useClass: http_token_interceptor_1.HttpTokenInterceptor,
                    multi: true
                },
                common_1.DatePipe,
                angular5_toaster_1.ToasterService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map