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
var angular5_toaster_1 = require("angular5-toaster");
var AppComponent = /** @class */ (function () {
    function AppComponent(toasterService) {
        this.title = 'app works!';
        this.toasterconfig = new angular5_toaster_1.ToasterConfig({
            showCloseButton: true,
            tapToDismiss: false,
            timeout: 0
        });
        this.toasterService = toasterService;
    }
    AppComponent.prototype.popToast = function () {
        this.toasterService.pop('success', 'Args Title', 'Args Body');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            encapsulation: core_1.ViewEncapsulation.None,
            styleUrls: ['../css/style.scss'],
            templateUrl: '../view/app.component.html',
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof angular5_toaster_1.ToasterService !== "undefined" && angular5_toaster_1.ToasterService) === "function" && _a || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map