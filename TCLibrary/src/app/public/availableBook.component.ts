import { Component, Input, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { UserService } from '../shared/services/user.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/utils/api.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { IBookDetails } from '../dashboard/models/book.details.interface';

@Component({
    selector: 'app-home',
    styleUrls: ['../../css/modal.scss'],
    templateUrl: '../../view/AvailableBooks.html',
    encapsulation: ViewEncapsulation.None,
    providers: [DashboardService, DatePipe]
})

export class AvailableBookComponent implements OnInit {
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
        private apiService: ApiService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a')
        this.getAvailableBooks();
    }

    getAvailableBooks(): any {
        this.apiService.get(`/public/availablebooks`).subscribe(
            result => {
                this.books = result,
                    this.dtTrigger.next();
            });
    }
}