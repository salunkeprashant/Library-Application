import { Component, Input, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { UserService } from '../shared/services/user.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../shared/utils/config.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../shared/services/base.service';
import { IBookDetails } from '../dashboard/models/book.details.interface';

@Component({
    selector: 'app-home',
    styleUrls: ['../../css/modal.scss'],
    templateUrl: '../../view/AvailableBooks.html',
    encapsulation: ViewEncapsulation.None,
    providers: [DashboardService, DatePipe]
})

export class AvailableBookComponent extends BaseService implements OnInit {
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    books: any;
    public title: any;
    public searchString: string;

    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;
    today;
    baseUrl: string = '';

    constructor(private dashboardService: DashboardService,
        public datePipe: DatePipe,
        private router: Router,
        private configService: ConfigService,
        private http: Http,
        private activatedRoute: ActivatedRoute) {
        super();
        this.baseUrl = configService.getApiURI();
    }

    ngOnInit() {
        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a')
        this.getAvailableBooks();
    }

    getAvailableBooks():any {
        this.getBookDetails()
        .subscribe(
            result => {
                this.books = result,
                    this.dtTrigger.next();
            },
            error => console.log("Error :: " + error)
        )
    }

    getBookDetails(): Observable<IBookDetails[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.get(this.baseUrl + "/public/availablebooks", { headers })
            .map(response => { return response.json() })
            .catch(this.handleError);
    }
}