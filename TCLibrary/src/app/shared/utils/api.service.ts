import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) { }

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(environment.api_url + url);
    }

    post(url: string, body: string): Observable<any>{
        return this.http.post(environment.api_url + url, body);
    }

    put<T>(url: string, body: string): Observable<T> {
        return this.http.put<T>(environment.api_url + url, body);
    }

    delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(environment.api_url + url);
    }

    patch<T>(url: string, body: string): Observable<T> {
        return this.http.patch<T>(environment.api_url + url, body);
    }
}
