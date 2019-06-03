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
var environment_1 = require("../../../environments/environment");
var http_1 = require("@angular/common/http");
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
    }
    ApiService.prototype.get = function (url, dataTableParameter) {
        return this.http.get(environment_1.environment.api_url + url, dataTableParameter);
    };
    ApiService.prototype.post = function (url, body, dataTableParameter) {
        return this.http.post(environment_1.environment.api_url + url, body);
    };
    ApiService.prototype.put = function (url, body) {
        return this.http.put(environment_1.environment.api_url + url, body);
    };
    ApiService.prototype.delete = function (url) {
        return this.http.delete(environment_1.environment.api_url + url);
    };
    ApiService.prototype.patch = function (url, body) {
        return this.http.patch(environment_1.environment.api_url + url, body);
    };
    ApiService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map