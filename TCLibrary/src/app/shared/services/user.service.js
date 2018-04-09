"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../utils/api.service");
var Rx_1 = require("rxjs/Rx");
//import * as _ from 'lodash';
// Add the RxJS Observable operators we need in this app.
require("../../rxjs-operators");
var UserService = /** @class */ (function () {
    function UserService(apiService) {
        this.apiService = apiService;
        this.baseUrl = '';
        // Observable navItem source
        this._authNavStatusSource = new Rx_1.BehaviorSubject(false);
        // Observable navItem stream
        this.authNavStatus$ = this._authNavStatusSource.asObservable();
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('auth_token');
        // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
        // header component resulting in authed user nav links disappearing despite the fact user is still logged in
        this._authNavStatusSource.next(this.loggedIn);
    }
    UserService.prototype.register = function (email, password, firstName, lastName, confirmpassword) {
        var body = JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName, confirmpassword: confirmpassword });
        return this.apiService.post("/accounts", body);
    };
    UserService.prototype.login = function (userName, password) {
        var _this = this;
        return this.apiService.post("/auth/login", JSON.stringify({ userName: userName, password: password }))
            .map(function (data) {
            localStorage.setItem('auth_token', data.auth_token);
            _this.loggedIn = true;
            _this._authNavStatusSource.next(true);
            return true;
        });
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    };
    UserService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map