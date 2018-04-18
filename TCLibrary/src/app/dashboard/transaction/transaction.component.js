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
var TransactionComponent = /** @class */ (function () {
    function TransactionComponent(dashboardService, userService, modalService, datePipe) {
        this.dashboardService = dashboardService;
        this.userService = userService;
        this.modalService = modalService;
        this.datePipe = datePipe;
        this.submitted = false;
        this.saveSuccess = false;
        this.row = '';
    }
    TransactionComponent.prototype.ngOnInit = function () {
        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
        this.getBooks();
        this.getMemberList();
        this.getAdmins();
    };
    TransactionComponent.prototype.openmodal = function (content, row) {
        console.log(row.isbn);
        this.row = row;
        this.modalRef = this.modalService.open(content);
    };
    TransactionComponent.prototype.getBooks = function () {
        var _this = this;
        this.dashboardService.getBookDetails()
            .subscribe(function (result) {
            _this.books = result,
                console.log(_this.books);
        });
    };
    TransactionComponent.prototype.getAdmins = function () {
        var _this = this;
        this.dashboardService.getAdmins()
            .subscribe(function (result) { return _this.adminList = result; });
    };
    TransactionComponent.prototype.getMemberList = function () {
        var _this = this;
        this.dashboardService.getMemberDetails()
            .subscribe(function (result) { return _this.memberList = result; });
    };
    TransactionComponent.prototype.issueBook = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        this.bookId = this.row.bookId;
        console.log(this.bookId);
        if (valid) {
            this.dashboardService.IssueBook(value.isbn, this.bookId, value.memberId, value.adminId, value.issueDate)
                .finally(function () { return _this.isRequesting = false; })
                .subscribe(function (result) {
                if (result) {
                    _this.saveSuccess = true;
                    _this.modalRef.dismiss();
                }
            }, function (errors) { return _this.errors = errors; });
        }
    };
    TransactionComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            styleUrls: ['../../../css/modal.scss'],
            templateUrl: '../../../view/transaction.component.html',
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [dashboard_service_1.DashboardService, common_1.DatePipe]
        }),
        __metadata("design:paramtypes", [dashboard_service_1.DashboardService,
            user_service_1.UserService,
            ng_bootstrap_1.NgbModal,
            common_1.DatePipe])
    ], TransactionComponent);
    return TransactionComponent;
}());
exports.TransactionComponent = TransactionComponent;
//# sourceMappingURL=transaction.component.js.map