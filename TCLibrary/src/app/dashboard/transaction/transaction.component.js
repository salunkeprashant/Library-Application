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
var rxjs_1 = require("rxjs");
var angular5_toaster_1 = require("angular5-toaster");
var angular_datatables_1 = require("angular-datatables");
var TransactionComponent = /** @class */ (function () {
    function TransactionComponent(dashboardService, userService, modalService, datePipe, toasterService) {
        this.dashboardService = dashboardService;
        this.userService = userService;
        this.modalService = modalService;
        this.datePipe = datePipe;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.submitted = false;
        this.saveSuccess = false;
        this.row = '';
        this.toasterService = toasterService;
    }
    TransactionComponent.prototype.ngOnInit = function () {
        this.dtOptions = {
            columnDefs: [
                { defaultContent: "", targets: "_all" },
                { targets: [1, 3], orderable: true },
                { targets: "_all", orderable: false }
            ],
            language: {
                info: "Items _START_ to _END_ of _TOTAL_",
                lengthMenu: "Page Size:  _MENU_",
                processing: "",
                zeroRecords: "No data available"
            },
            dom: "<'row'<'col-sm-3'B>>" + "<'row'<'col-sm-12'tr>>" +
                "<'row table-control-row'<'col-sm-3'i><'col-sm-3'l><'col-sm-6'p>>",
            lengthMenu: [[10, 20, 30], [10, 20, 30]],
            info: true,
            paging: true,
            searching: true,
            destroy: true,
            order: [[1, "asc"], [3, "asc"]],
            // Configure the buttons
            buttons: [
                {
                    extend: 'excel',
                    text: '',
                    className: 'fa fa-file-excel-o',
                    init: function (api, node, config) {
                        $(node).removeClass('dt-button');
                    },
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                },
                {
                    extend: 'print',
                    text: '',
                    className: 'fa fa-print',
                    init: function (api, node, config) {
                        $(node).removeClass('dt-button');
                    },
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                }
            ]
        },
            this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
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
        this.dashboardService.getBookDetails().subscribe(function (result) {
            _this.books = result;
            // Calling the DT trigger to manually render the table
            _this.dtTrigger.next();
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
        var workingMember = this.memberList.filter(function (x) { return x.memberId == value.memberId; })[0];
        if (valid) {
            this.dashboardService.IssueBook(this.row.isbn, this.row.bookId, value.memberId, value.adminId, value.issueDate)
                .subscribe(function (result) {
                if (result) {
                    _this.toasterService.pop('success', _this.row.title + " Book Issued To", workingMember.firstName + " " + workingMember.lastName);
                    _this.modalRef.dismiss();
                    _this.rerender();
                }
            }, function (errors) { return _this.errors = errors.error; });
        }
    };
    TransactionComponent.prototype.rerender = function () {
        var _this = this;
        this.dtElement.dtInstance.then(function (dtInstance) {
            // Destroy the table first
            dtInstance.destroy();
            // get books & Call the dtTrigger to rerender again
            _this.dashboardService.getBookDetails().subscribe(function (result) {
                _this.books = result;
                // Calling the DT trigger to manually render the table
                _this.dtTrigger.next();
            });
        });
    };
    __decorate([
        core_1.ViewChild(angular_datatables_1.DataTableDirective),
        __metadata("design:type", angular_datatables_1.DataTableDirective)
    ], TransactionComponent.prototype, "dtElement", void 0);
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
            common_1.DatePipe, typeof (_a = typeof angular5_toaster_1.ToasterService !== "undefined" && angular5_toaster_1.ToasterService) === "function" && _a || Object])
    ], TransactionComponent);
    return TransactionComponent;
    var _a;
}());
exports.TransactionComponent = TransactionComponent;
//# sourceMappingURL=transaction.component.js.map