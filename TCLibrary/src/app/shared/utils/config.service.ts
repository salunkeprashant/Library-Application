import { Injectable } from '@angular/core';
 
@Injectable()
export class ConfigService {
     
    _apiURI : string;
    constructor() {
        this._apiURI = 'http://10.200.20.48:8000/';
     }
 
     getApiURI() {
         return this._apiURI;
    }    
    AuthHeader() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return headers;
    }
}
 