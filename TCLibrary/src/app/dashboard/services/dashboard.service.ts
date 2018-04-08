import { Injectable } from '@angular/core';

import { IHomeDetails } from '../models/home.details.interface';
import { IBookDetails } from '../models/book.details.interface';
import { IMemberDetails } from '../models/member.details.interface';
import { IBookCategoryDetails } from '../models/bookcategory.details.inteface';

import { ApiService } from '../../shared/utils/api.service';

import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

//import * as _ from 'lodash';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

//declare let head;
@Injectable()
export class DashboardService {
    baseUrl: string = '';
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    authNavStatus$ = this._authNavStatusSource.asObservable();
    private loggedIn = false;

    constructor(private ApiService: ApiService) {
        this.loggedIn = !!localStorage.getItem('auth_token')
        this._authNavStatusSource.next(this.loggedIn);
        //head = configService.AuthHeader();
    }

    getHomeDetails(): Observable<IHomeDetails> {

        return this.ApiService.get(`/dashboard/home`)
    }

    getBookDetails() {

        return this.ApiService.get(`/dashboard/book`)
    }

    getDetails() {
        return this.ApiService.get(`/dashboard/issuedetails`)
    }

    getMemberDetails(): Observable<IMemberDetails[]> {
        return this.ApiService.get(`/member`)
    }

    getBookCatgory() {
        return this.ApiService.get(`/dashboard/category`)
    }

    getAdmins() {
        return this.ApiService.get(`/admins`)
    }

    getAuthors() {
        return this.ApiService.get(`/dashboard/authors`)
    }

    IssueBook(isbn: number, bookId: number, memberId: number, adminId: number, issueDate: string) {
        let body = JSON.stringify({ isbn, bookId, memberId, adminId, issueDate });

        return this.ApiService.post(this.baseUrl + "/dashboard/issuebook", body);
    }

    ReturnBook(transactionId: number, bookId:number,returnDate:number) {
        let body = JSON.stringify({ transactionId,bookId,returnDate});

        return this.ApiService.post(this.baseUrl + "/dashboard/returnbook", body)
    }


    AddBook(isbn: number, title: string, authors: any, categoryId: number, categoryName: string, ratings: number, yearofpublish: string, pages: number, quantity: number): Observable<IBookDetails[]> {
        let body = JSON.stringify({ isbn, title, authors,categoryId,categoryName, pages, quantity, ratings, yearofpublish });
        console.log(authors);

        return this.ApiService.post("/dashboard/addbook", body)
            .map(res => true)
            .catch(err => {
            console.log('Caught error', err);
            return Observable.throw(err);
        });
    }

    UpdateBook(isbn: number, title: string, authorId: number, author: string, categoryId: number, categoryName: string, ratings: number, yearofpublish: string, pages: number, quantity: number): Observable<IBookDetails[]> {
        let body = JSON.stringify({ isbn, title, authorId, author, categoryId, categoryName, pages, quantity, ratings, yearofpublish });

        return this.ApiService.post(this.baseUrl + "/dashboard/Updatebook", body);
    }

    UpdateMember(memberId:number, addressLine: string, cityName: string, emailAddress: string, firstName: string, lastName: string, mobileNo: string, joiningDate: string, stateName: string ) {
        let body = JSON.stringify({ memberId, addressLine, cityName, emailAddress, firstName, lastName, mobileNo, joiningDate, stateName});


        return this.ApiService.post(this.baseUrl + "/member/updatemember", body);
    }


    AddMember(memberId: number, joiningDate: string, firstName: string, lastName: string, mobileNo: number, emailAddress: string, addressLine: string, cityName: string, stateName: string): Observable<IMemberDetails[]> {
        let body = JSON.stringify({ memberId, joiningDate, firstName, lastName, emailAddress, mobileNo, addressLine, cityName, stateName });
        return this.ApiService.post(`/member`, body);
    }

    deleteMember(memberId: number) {
        return this.ApiService.delete(`/member` + "/" + memberId);
    }

    deleteBook(isbn: number) {

        return this.ApiService.delete(`/dashboard` + "/" + isbn);
    }
}