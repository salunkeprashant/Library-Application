import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


import { IHomeDetails } from '../models/home.details.interface';
import { IBookDetails } from '../models/book.details.interface'
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

    getBookCatgory() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get(this.baseUrl + "/dashboard/category", { headers })
            .map(response => { return response.json() })
            .catch(this.handleError);
    }

    AddBook(isbn: number, title: string, author: string, categoryId: number, bookId: number, pages: number, quantity: number, ratings: number, yearofpublish: string): Observable<IBookDetails[]> {
        let body = JSON.stringify({ isbn, title, author, categoryId, bookId, pages, quantity, ratings, yearofpublish});
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + "/dashboard/addbook", body, options)
            .map(res => true)
            .catch(this.handleError);
    }
}