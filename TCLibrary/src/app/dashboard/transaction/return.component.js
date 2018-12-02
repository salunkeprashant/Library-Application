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
var dashboard_service_1 = require("../services/dashboard.service");
var user_service_1 = require("../../shared/services/user.service");
var common_1 = require("@angular/common");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ReturnComponent = /** @class */ (function () {
    function ReturnComponent(dashboardService, userService, datePipe, modalService) {
        this.dashboardService = dashboardService;
        this.userService = userService;
        this.datePipe = datePipe;
        this.modalService = modalService;
        this.submitted = false;
        this.saveSuccess = false;
    }
    ReturnComponent.prototype.ngOnInit = function () {
        this.getDetails();
    };
    ReturnComponent.prototype.openmodal = function (content, rows) {
        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
        this.rows = rows;
        console.log(this.rows);
        this.modalRef = this.modalService.open(content);
    };
    ReturnComponent.prototype.getDetails = function () {
        var _this = this;
        this.dashboardService.getDetails()
            .subscribe(function (result) { return _this.details = result; }, function (error) { return console.log("Error :: " + error); });
    };
    ReturnComponent.prototype.returnBook = function (_a) {
        var _this = this;
        var value = _a.value;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        this.transactionId = this.rows.transactionId;
        this.bookId = this.rows.bookId;
        this.dashboardService.ReturnBook(this.transactionId, this.bookId, value.returnDate)
            .finally(function () { return _this.isRequesting = false; })
            .subscribe(function (result) {
            if (result) {
                _this.saveSuccess = true;
                _this.modalRef.dismiss();
            }
        }, function (errors) { return _this.errors = errors; });
    };
    ReturnComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            //styleUrls: ['../../../css/txnmodal.scss'],
            styleUrls: ['../../../css/modal.scss'],
            templateUrl: '../../../view/return.component.html',
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [dashboard_service_1.DashboardService, common_1.DatePipe]
        }),
        __metadata("design:paramtypes", [dashboard_service_1.DashboardService,
            user_service_1.UserService,
            common_1.DatePipe,
            ng_bootstrap_1.NgbModal])
    ], ReturnComponent);
    return ReturnComponent;
}());
exports.ReturnComponent = ReturnComponent;
//# sourceMappingURL=return.component.js.map