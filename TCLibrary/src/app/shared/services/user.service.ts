import { Injectable } from '@angular/core';
import { IUserRegistration } from '../models/user.registration.interface';
import { ApiService } from '../utils/api.service';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { distinctUntilChanged, map } from 'rxjs/operators';

//import * as _ from 'lodash';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

@Injectable()
export class UserService {

    baseUrl: string = '';

    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private loggedIn = false;

    constructor(private apiService: ApiService) {
        this.loggedIn = !!localStorage.getItem('auth_token');
        // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
        // header component resulting in authed user nav links disappearing despite the fact user is still logged in
        this._authNavStatusSource.next(this.loggedIn);
    }

    register(email: string, password: string, firstName: string, lastName: string, confirmpassword: string): Observable<IUserRegistration> {
        let body = JSON.stringify({ email, password, firstName, lastName, confirmpassword });

        return this.apiService.post(`/accounts`, body);
    }

    login(userName, password) {

        return this.apiService.post(`/auth/login`, JSON.stringify({ userName, password }))
            .map(data => {
                localStorage.setItem('auth_token', data.auth_token);
                this.loggedIn = true;
                this._authNavStatusSource.next(true);
                return true;
            });
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}

