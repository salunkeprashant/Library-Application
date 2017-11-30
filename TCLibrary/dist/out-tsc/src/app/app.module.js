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
var http_1 = require("@angular/http");
var authenticate_xhr_backend_1 = require("./authenticate-xhr.backend");
var app_routing_1 = require("./app.routing");
/* App Root */
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var home_component_1 = require("./home/home.component");
/* Account Imports */
var account_module_1 = require("./account/account.module");
/* Dashboard Imports */
var dashboard_module_1 = require("./dashboard/dashboard.module");
var config_service_1 = require("./shared/utils/config.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                home_component_1.HomeComponent
            ],
            imports: [
                account_module_1.AccountModule,
                dashboard_module_1.DashboardModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            providers: [config_service_1.ConfigService, {
                    provide: http_1.XHRBackend,
                    useClass: authenticate_xhr_backend_1.AuthenticateXHRBackend
                }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map