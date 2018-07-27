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
var Subject_1 = require("rxjs/Subject");
var api_service_1 = require("../../shared/utils/api.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular5_toaster_1 = require("angular5-toaster");
var BookComponent = /** @class */ (function () {
    function BookComponent(dashboardService, userService, apiService, modalService, toasterService) {
        var _this = this;
        this.dashboardService = dashboardService;
        this.userService = userService;
        this.apiService = apiService;
        this.modalService = modalService;
        this.dtOptions = {};
        this.book = '';
        this.enterCategory = function (term) { return ({ categoryId: term, categoryName: term }); };
        this.enterAuthor = function (term) { return ({ authorId: (_this.authorList).length + 1, author: term }); };
        this.submitted = false;
        this.saveSuccess = false;
        this.years = [];
        this.dtTrigger = new Subject_1.Subject();
        this.toasterService = toasterService;
    }
    BookComponent.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    BookComponent.prototype.ngOnInit = function () {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
        },
            this.getYear();
        this.getBooks();
        this.getCategoryList();
        this.getAuthors();
    };
    BookComponent.prototype.openmodal = function (content, book) {
        if (book !== undefined) {
            this.book = book;
            this.isbn = book.isbn;
        }
        this.modalRef = this.modalService.open(content);
    };
    BookComponent.prototype.getBooks = function () {
        var _this = this;
        this.apiService.get("/dashboard/book").subscribe(function (result) {
            _this.books = result;
            // Calling the DT trigger to manually render the table
            _this.dtTrigger.next();
        });
    };
    BookComponent.prototype.getCategoryList = function () {
        var _this = this;
        this.dashboardService.getBookCatgory()
            .subscribe(function (result) { return _this.categoryList = result; });
    };
    BookComponent.prototype.getAuthors = function () {
        var _this = this;
        this.dashboardService.getAuthors()
            .subscribe(function (result) { return _this.authorList = result; });
    };
    BookComponent.prototype.addBook = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        if (typeof value.categoryId === "string") {
            this.categoryName = value.categoryId;
            value.categoryId = (this.categoryList).length + 1;
        }
        this.submitted = true;
        this.errors = '';
        console.log(value);
        if (valid) {
            this.busyPromise = this.dashboardService.AddBook(value.isbn, value.title, value.authors, value.categoryId, this.categoryName, value.ratings, value.yearofpublish, value.pages, value.quantity)
                .toPromise()
                .then(function (result) {
                if (result) {
                    _this.saveSuccess = true;
                    _this.toasterService.pop('success', 'Args Title', 'Args Body');
                    _this.modalRef.dismiss();
                }
            }, function (errors) { return _this.errors = errors; });
        }
    };
    BookComponent.prototype.updateBook = function (_a) {
        var _this = this;
        var value = _a.value;
        if (typeof value.categoryId === "string") {
            this.categoryName = value.categoryId;
            value.categoryId = (this.categoryList).length + 1;
        }
        if (typeof value.authorId === "string") {
            this.author = value.authorId;
            value.authorId = (this.authorList).length + 1;
        }
        console.log(value);
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        this.dashboardService.UpdateBook(value.isbn, value.title, value.authorId, this.author, value.categoryId, this.categoryName, value.ratings, value.yearofpublish, value.pages, value.quantity)
            .finally(function () { return _this.isRequesting = false; })
            .subscribe(function (result) {
            if (result) {
                _this.saveSuccess = true;
                _this.modalRef.dismiss();
                // window.location.reload();
            }
        }, function (errors) { return _this.errors = errors; });
    };
    BookComponent.prototype.deleteBook = function (_a) {
        var _this = this;
        var value = _a.value;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        this.dashboardService.deleteBook(this.isbn)
            .finally(function () { return _this.isRequesting = false; })
            .subscribe(function (result) {
            if (result) {
                _this.saveSuccess = true;
                _this.modalRef.dismiss();
                window.location.reload();
            }
        }, function (errors) { return _this.errors = errors; });
    };
    BookComponent.prototype.getYear = function () {
        var today = new Date();
        this.yy = today.getFullYear();
        for (var i = (this.yy - 400); i <= this.yy; i++) {
            this.years.push(i);
        }
    };
    BookComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            styleUrls: ['../../../css/modal.scss'],
            templateUrl: '../../../view/book.component.html',
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [dashboard_service_1.DashboardService]
        }),
        __metadata("design:paramtypes", [dashboard_service_1.DashboardService,
            user_service_1.UserService,
            api_service_1.ApiService,
            ng_bootstrap_1.NgbModal, typeof (_a = typeof angular5_toaster_1.ToasterService !== "undefined" && angular5_toaster_1.ToasterService) === "function" && _a || Object])
    ], BookComponent);
    return BookComponent;
    var _a;
}());
exports.BookComponent = BookComponent;
//# sourceMappingURL=book.component.js.map