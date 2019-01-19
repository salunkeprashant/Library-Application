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
var dashboard_service_1 = require("../dashboard/services/dashboard.service");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var api_service_1 = require("../shared/utils/api.service");
var Subject_1 = require("rxjs/Subject");
var AvailableBookComponent = /** @class */ (function () {
    function AvailableBookComponent(dashboardService, datePipe, router, apiService, activatedRoute) {
        this.dashboardService = dashboardService;
        this.datePipe = datePipe;
        this.router = router;
        this.apiService = apiService;
        this.activatedRoute = activatedRoute;
        this.dtOptions = {};
        this.dtTrigger = new Subject_1.Subject();
        this.submitted = false;
        this.baseUrl = '';
    }
    AvailableBookComponent.prototype.ngOnInit = function () {
        this.dtOptions = {
            columnDefs: [
                { defaultContent: "", targets: "_all" },
                { targets: [1, 3, 4], orderable: true },
                { targets: "_all", orderable: false }
            ],
            language: {
                info: "Items _START_ to _END_ of _TOTAL_",
                lengthMenu: "Page Size:  _MENU_",
                processing: "",
                zeroRecords: "No data available"
            },
            dom: "<'row'<'col-sm-3'B>>" + "<'row'<'col-sm-12'<'allow-horizontal-scrolling'tr>>>" +
                "<'row table-control-row'<'col-sm-3'i><'col-sm-3'l><'col-sm-6'p>>",
            lengthMenu: [[10, 20, 30], [10, 20, 30]],
            info: true,
            scrollY: "500px",
            scrollCollapse: true,
            paging: true,
            searching: true,
            destroy: true,
            order: [[1, "asc"], [4, "asc"]],
        },
            this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
        this.getAvailableBooks();
    };
    AvailableBookComponent.prototype.getAvailableBooks = function () {
        var _this = this;
        this.apiService.get("/public/availablebooks").subscribe(function (result) {
            _this.books = result;
        });
    };
    AvailableBookComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            styleUrls: ['../../css/modal.scss'],
            templateUrl: '../../view/AvailableBooks.html',
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [dashboard_service_1.DashboardService, common_1.DatePipe]
        }),
        __metadata("design:paramtypes", [dashboard_service_1.DashboardService,
            common_1.DatePipe,
            router_1.Router,
            api_service_1.ApiService,
            router_1.ActivatedRoute])
    ], AvailableBookComponent);
    return AvailableBookComponent;
}());
exports.AvailableBookComponent = AvailableBookComponent;
//# sourceMappingURL=availableBook.component.js.map