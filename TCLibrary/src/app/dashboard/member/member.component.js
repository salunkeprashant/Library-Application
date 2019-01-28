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
var angular5_toaster_1 = require("angular5-toaster");
var dashboard_service_1 = require("../services/dashboard.service");
var user_service_1 = require("../../shared/services/user.service");
var common_1 = require("@angular/common");
var angular_datatables_1 = require("angular-datatables");
var rxjs_1 = require("rxjs");
var MemberComponent = /** @class */ (function () {
    function MemberComponent(dashboardService, userService, modalService, datePipe, toasterService) {
        this.dashboardService = dashboardService;
        this.userService = userService;
        this.modalService = modalService;
        this.datePipe = datePipe;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.saveSuccess = false;
        this.member = '';
        this.memberId = '';
        this.toasterService = toasterService;
    }
    MemberComponent.prototype.ngOnInit = function () {
        this.dtOptions = {
            columnDefs: [
                { defaultContent: "", targets: "_all" },
                { targets: [1, 3, 4, 6], orderable: true },
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
            order: [[1, "asc"], [2, "asc"]],
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
                        columns: [0, 1, 2, 3, 4, 5, 6, 7]
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
                        columns: [0, 1, 2, 3, 4, 5, 6, 7]
                    }
                }
            ]
        },
            this.getMembers();
        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    };
    MemberComponent.prototype.openmodal = function (content, member) {
        if (member !== undefined) {
            this.member = member;
            this.member.joiningDate = this.datePipe.transform(member.joiningDate, 'yyyy-MM-dd');
            this.memberId = member.memberId;
        }
        this.modalRef = this.modalService.open(content);
    };
    MemberComponent.prototype.getMembers = function () {
        var _this = this;
        this.dashboardService.getMemberDetails()
            .subscribe(function (result) {
            _this.members = result;
            // Calling the DT trigger to manually render the table
            _this.dtTrigger.next();
        }, function (error) { return console.log("Error :: " + error); });
    };
    MemberComponent.prototype.addMember = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.NewmemberId = (this.members).length + 1;
        console.log(this.NewmemberId);
        this.errors = '';
        if (valid) {
            this.addMemberbusyPromise = this.dashboardService.AddMember(this.NewmemberId, value.joiningDate, value.firstName, value.lastName, value.mobileNo, value.emailAddress, value.addressLine, value.cityName, value.stateName)
                .toPromise()
                .then(function (result) {
                if (result) {
                    _this.toasterService.pop('success', 'Member Added', value.firstName + " " + value.lastName);
                    _this.modalRef.dismiss();
                    _this.rerender();
                }
            }, function (errors) { return _this.errors = errors.error; });
        }
    };
    MemberComponent.prototype.deleteMember = function (_a) {
        var _this = this;
        var value = _a.value;
        this.errors = '';
        this.deleteMemberbusyPromise = this.dashboardService.deleteMember(this.memberId)
            .toPromise()
            .then(function (result) {
            if (result) {
                _this.toasterService.pop('error', 'Member Delete', _this.member.firstName + " " + _this.member.lastName);
                _this.modalRef.dismiss();
                _this.rerender();
            }
        }, function (errors) { return _this.errors = errors.error; });
    };
    MemberComponent.prototype.updateMember = function (_a) {
        var _this = this;
        var value = _a.value;
        console.log(value, this.memberId);
        this.errors = '';
        this.updateMemberbusyPromise = this.dashboardService.UpdateMember(this.memberId, value.addressLine, value.cityName, value.emailAddress, value.firstName, value.lastName, value.mobileNo, value.joiningDate, value.stateName)
            .toPromise()
            .then(function (result) {
            if (result) {
                _this.toasterService.pop('success', 'Member Update', _this.member.firstName + " " + _this.member.lastName);
                _this.modalRef.dismiss();
                _this.rerender();
            }
        }, function (errors) { return _this.errors = errors.error; });
    };
    MemberComponent.prototype.rerender = function () {
        var _this = this;
        this.dtElement.dtInstance.then(function (dtInstance) {
            // Destroy the table first
            dtInstance.destroy();
            // get books & Call the dtTrigger to rerender again
            _this.dashboardService.getMemberDetails().subscribe(function (result) {
                _this.members = result;
                // Calling the DT trigger to manually render the table
                _this.dtTrigger.next();
            });
        });
    };
    __decorate([
        core_1.ViewChild(angular_datatables_1.DataTableDirective),
        __metadata("design:type", angular_datatables_1.DataTableDirective)
    ], MemberComponent.prototype, "dtElement", void 0);
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
            common_1.DatePipe, typeof (_a = typeof angular5_toaster_1.ToasterService !== "undefined" && angular5_toaster_1.ToasterService) === "function" && _a || Object])
    ], MemberComponent);
    return MemberComponent;
    var _a;
}());
exports.MemberComponent = MemberComponent;
//# sourceMappingURL=member.component.js.map