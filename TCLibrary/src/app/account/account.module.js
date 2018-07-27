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
var animations_1 = require("@angular/platform-browser/animations");
var ng_busy_1 = require("ng-busy");
var shared_module_1 = require("../shared/modules/shared.module");
var user_service_1 = require("../shared/services/user.service");
var email_validator_directive_1 = require("../directives/email.validator.directive");
var account_routing_1 = require("./account.routing");
var registration_form_component_1 = require("./registration-form/registration-form.component");
var login_form_component_1 = require("./login-form/login-form.component");
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, forms_1.FormsModule, account_routing_1.routing, shared_module_1.SharedModule,
                animations_1.BrowserAnimationsModule,
                ng_busy_1.NgBusyModule
            ],
            declarations: [registration_form_component_1.RegistrationFormComponent, email_validator_directive_1.EmailValidator, login_form_component_1.LoginFormComponent],
            providers: [user_service_1.UserService]
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map