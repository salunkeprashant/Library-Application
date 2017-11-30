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
var shared_module_1 = require("../shared/modules/shared.module");
var dashboard_routing_1 = require("./dashboard.routing");
var root_component_1 = require("./root/root.component");
var home_component_1 = require("./home/home.component");
var book_component_1 = require("./book/book.component");
var dashboard_service_1 = require("./services/dashboard.service");
var auth_guard_1 = require("../auth.guard");
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                dashboard_routing_1.routing,
                shared_module_1.SharedModule
            ],
            declarations: [root_component_1.RootComponent, home_component_1.HomeComponent, book_component_1.BookComponent],
            exports: [],
            providers: [auth_guard_1.AuthGuard, dashboard_service_1.DashboardService]
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map