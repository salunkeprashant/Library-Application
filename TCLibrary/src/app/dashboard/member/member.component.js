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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var dashboard_service_1 = require("../services/dashboard.service");
var user_service_1 = require("../../shared/services/user.service");
var common_1 = require("@angular/common");
var MemberComponent = /** @class */ (function () {
    function MemberComponent(dashboardService, userService, modalService, datePipe) {
        this.dashboardService = dashboardService;
        this.userService = userService;
        this.modalService = modalService;
        this.datePipe = datePipe;
        this.submitted = false;
        this.saveSuccess = false;
        this.member = '';
        this.memberId = '';
    }
    MemberComponent.prototype.ngOnInit = function () {
        this.getMembers();
        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    };
    MemberComponent.prototype.openmodal = function (content, member) {
        if (member !== undefined) {
            this.member = member;
            this.memberId = member.memberId;
        }
        this.modalRef = this.modalService.open(content);
    };
    MemberComponent.prototype.getMembers = function () {
        var _this = this;
        this.dashboardService.getMemberDetails()
            .subscribe(function (result) { return _this.members = result; }, function (error) { return console.log("Error :: " + error); });
    };
    MemberComponent.prototype.addMember = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.NewmemberId = (this.members).length + 1;
        console.log(this.NewmemberId);
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.dashboardService.AddMember(this.NewmemberId, value.joiningDate, value.firstName, value.lastName, value.mobileNo, value.emailAddress, value.addressLine, value.cityName, value.stateName)
                .finally(function () { return _this.isRequesting = false; })
                .subscribe(function (result) {
                if (result) {
                    _this.saveSuccess = true;
                    _this.modalRef.dismiss();
                }
            }, function (errors) { return _this.errors = errors; });
        }
    };
    MemberComponent.prototype.deleteMember = function (_a) {
        var _this = this;
        var value = _a.value;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        this.dashboardService.deleteMember(this.memberId)
            .finally(function () { return _this.isRequesting = false; })
            .subscribe(function (result) {
            if (result) {
                _this.saveSuccess = true;
                _this.modalRef.dismiss();
            }
        }, function (errors) { return _this.errors = errors; });
    };
    MemberComponent.prototype.updateMember = function (_a) {
        var _this = this;
        var value = _a.value;
        console.log(value, this.memberId);
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        this.dashboardService.UpdateMember(this.memberId, value.addressLine, value.cityName, value.emailAddress, value.firstName, value.lastName, value.mobileNo, value.joiningDate, value.stateName)
            .finally(function () { return _this.isRequesting = false; })
            .subscribe(function (result) {
            if (result) {
                _this.saveSuccess = true;
                _this.modalRef.dismiss();
            }
        }, function (errors) { return _this.errors = errors; });
    };
    MemberComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            styleUrls: ['../../../css/modal.scss'],
            templateUrl: '../../../view/member.component.html',
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [dashboard_service_1.DashboardService, common_1.DatePipe]
        }),
        __metadata("design:paramtypes", [dashboard_service_1.DashboardService,
            user_service_1.UserService,
            ng_bootstrap_1.NgbModal,
            common_1.DatePipe])
    ], MemberComponent);
    return MemberComponent;
}());
exports.MemberComponent = MemberComponent;
//# sourceMappingURL=member.component.js.map