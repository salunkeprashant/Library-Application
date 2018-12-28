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
var api_service_1 = require("../../shared/utils/api.service");
var Rx_1 = require("rxjs/Rx");
//import * as _ from 'lodash';
// Add the RxJS Observable operators we need in this app.
require("../../rxjs-operators");
//declare let head;
var DashboardService = /** @class */ (function () {
    function DashboardService(ApiService) {
        this.ApiService = ApiService;
        this.baseUrl = '';
        this._authNavStatusSource = new Rx_1.BehaviorSubject(false);
        this.authNavStatus$ = this._authNavStatusSource.asObservable();
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('auth_token');
        this._authNavStatusSource.next(this.loggedIn);
        //head = configService.AuthHeader();
    }
    DashboardService.prototype.getHomeDetails = function () {
        return this.ApiService.get("/dashboard/home");
    };
    DashboardService.prototype.getBookDetails = function () {
        return this.ApiService.get("/dashboard/book");
    };
    DashboardService.prototype.getIssuedBookDetails = function () {
        return this.ApiService.get("/dashboard/issuedetails");
    };
    DashboardService.prototype.getMemberDetails = function () {
        return this.ApiService.get("/member");
    };
    DashboardService.prototype.getBookCatgory = function () {
        return this.ApiService.get("/dashboard/category");
    };
    DashboardService.prototype.getAdmins = function () {
        return this.ApiService.get("/admins");
    };
    DashboardService.prototype.getAuthors = function () {
        return this.ApiService.get("/dashboard/authors");
    };
    DashboardService.prototype.IssueBook = function (isbn, bookId, memberId, adminId, issueDate) {
        var body = JSON.stringify({ isbn: isbn, bookId: bookId, memberId: memberId, adminId: adminId, issueDate: issueDate });
        return this.ApiService.post(this.baseUrl + "/dashboard/issuebook", body);
    };
    DashboardService.prototype.ReturnBook = function (transactionId, bookId, returnDate) {
        var body = JSON.stringify({ transactionId: transactionId, bookId: bookId, returnDate: returnDate });
        return this.ApiService.post(this.baseUrl + "/dashboard/returnbook", body);
    };
    DashboardService.prototype.AddBook = function (isbn, title, authors, categoryId, categoryName, ratings, yearofpublish, pages, quantity) {
        var body = JSON.stringify({ isbn: isbn, title: title, authors: authors, categoryId: categoryId, categoryName: categoryName, pages: pages, quantity: quantity, ratings: ratings, yearofpublish: yearofpublish });
        console.log(authors);
        return this.ApiService.post("/dashboard/addbook", body);
    };
    DashboardService.prototype.UpdateBook = function (isbn, title, authors, categoryId, categoryName, ratings, yearofpublish, pages, quantity) {
        var body = JSON.stringify({ isbn: isbn, title: title, authors: authors, categoryId: categoryId, categoryName: categoryName, pages: pages, quantity: quantity, ratings: ratings, yearofpublish: yearofpublish });
        return this.ApiService.post(this.baseUrl + "/dashboard/Updatebook", body);
    };
    DashboardService.prototype.UpdateMember = function (memberId, addressLine, cityName, emailAddress, firstName, lastName, mobileNo, joiningDate, stateName) {
        var body = JSON.stringify({ memberId: memberId, addressLine: addressLine, cityName: cityName, emailAddress: emailAddress, firstName: firstName, lastName: lastName, mobileNo: mobileNo, joiningDate: joiningDate, stateName: stateName });
        return this.ApiService.post(this.baseUrl + "/member/updatemember", body);
    };
    DashboardService.prototype.AddMember = function (memberId, joiningDate, firstName, lastName, mobileNo, emailAddress, addressLine, cityName, stateName) {
        var body = JSON.stringify({ memberId: memberId, joiningDate: joiningDate, firstName: firstName, lastName: lastName, emailAddress: emailAddress, mobileNo: mobileNo, addressLine: addressLine, cityName: cityName, stateName: stateName });
        return this.ApiService.post("/member", body);
    };
    DashboardService.prototype.deleteMember = function (memberId) {
        return this.ApiService.delete("/member" + "/" + memberId);
    };
    DashboardService.prototype.deleteBook = function (isbn) {
        return this.ApiService.delete("/dashboard" + "/" + isbn);
    };
    DashboardService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map