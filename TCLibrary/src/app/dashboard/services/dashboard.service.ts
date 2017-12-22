import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


import { IHomeDetails } from '../models/home.details.interface';
import { IBookDetails } from '../models/book.details.interface';
import { IMemberDetails } from '../models/member.details.interface';
import { IBookCategoryDetails } from '../models/bookcategory.details.inteface';

import { ConfigService } from '../../shared/utils/config.service';

import { BaseService } from '../../shared/services/base.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

//import * as _ from 'lodash';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

//declare let head;
@Injectable()
export class DashboardService extends BaseService {
    baseUrl: string = '';
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    authNavStatus$ = this._authNavStatusSource.asObservable();
    private loggedIn = false;

    constructor(private http: Http, private configService: ConfigService) {
        super();
        this.loggedIn = !!localStorage.getItem('auth_token')
        this.baseUrl = configService.getApiURI();
        this._authNavStatusSource.next(this.loggedIn);
        //head = configService.AuthHeader();
    }

    getHomeDetails(): Observable<IHomeDetails> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get(this.baseUrl + "/dashboard/home", { headers })
            .map(response => response.json())
            .catch(this.handleError);
    }

    getBookDetails(): Observable<IBookDetails[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get(this.baseUrl + "/dashboard/book", { headers })
            .map(response => { return response.json() })
            .catch(this.handleError);
    }

    getDetails() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get(this.baseUrl + "/dashboard/issuedetails", { headers })
            .map(response => { return response.json() })
            .catch(this.handleError);
    }

    getMemberDetails(): Observable<IMemberDetails[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get(this.baseUrl + "/member", { headers })
            .map(response => { return response.json() })
            .catch(this.handleError);
    }

    getBookCatgory() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get(this.baseUrl + "/dashboard/category", { headers })
            .map(response => { return response.json() })
            .catch(this.handleError);
    }

    getAdmins() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get(this.baseUrl + "/admins", { headers })
            .map(response => { return response.json() })
            .catch(this.handleError);
    }

    getAuthors() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get(this.baseUrl + "/dashboard/authors", { headers })
            .map(response => { return response.json() })
            .catch(this.handleError);
    }

    IssueBook(isbn: number, bookId: number, memberId: number, adminId: number, issueDate: string) {
        let body = JSON.stringify({ isbn, bookId, memberId, adminId, issueDate });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + "/dashboard/issuebook", body, options)
            .map(res => true)
            .catch(this.handleError);
    }

    ReturnBook(transactionId: number, bookId:number,returnDate:number) {
        let body = JSON.stringify({ transactionId,bookId,returnDate});

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + "/dashboard/returnbook", body, options)
            .map(res => true)
            .catch(this.handleError);
    }


    AddBook(isbn: number, title: string, authors: any,author: string, categoryId: number, categoryName: string, ratings: number, yearofpublish: string, pages: number, quantity: number): Observable<IBookDetails[]> {
        let body = JSON.stringify({ isbn, title, authors,author,categoryId,categoryName, pages, quantity, ratings, yearofpublish });
        console.log(authors);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + "/dashboard/addbook", body, options)
            .map(res => true)
            .catch(this.handleError);
    }

    UpdateBook(isbn: number, title: string, authorId: number, author: string, categoryId: number, categoryName: string, ratings: number, yearofpublish: string, pages: number, quantity: number): Observable<IBookDetails[]> {
        let body = JSON.stringify({ isbn, title, authorId, author, categoryId, categoryName, pages, quantity, ratings, yearofpublish });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + "/dashboard/Updatebook", body, options)
            .map(res => true)
            .catch(this.handleError);
    }


    AddMember(memberId: number, joiningDate: string, firstName: string, lastName: string, mobileNo: number, emailAddress: string, addressLine: string, cityName: string, stateName: string): Observable<IMemberDetails[]> {
        let body = JSON.stringify({ memberId, joiningDate, firstName, lastName, emailAddress, mobileNo, addressLine, cityName, stateName });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + "/member", body, options)
            .map(res => true)
            .catch(this.handleError);
    }

    deleteMember(memberId: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.baseUrl + "/member" + "/" + memberId, options)
            .map(res => true)
            .catch(this.handleError);
    }

    deleteBook(isbn: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.baseUrl + "/dashboard/book" + "/" + isbn, options)
            .map(res => true)
            .catch(this.handleError);
    }
}