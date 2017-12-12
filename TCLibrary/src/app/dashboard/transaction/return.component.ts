import { Component, Input, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { IBookDetails } from '../models/book.details.interface';
import { IBookCategoryDetails } from '../models/bookcategory.details.inteface';
import { DashboardService } from '../services/dashboard.service';
import { ModalService } from '../services/modal.service'
import { UserService } from '../../shared/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-home',
    styleUrls: ['../../../css/txnmodal.scss'],
    templateUrl: '../../../view/return.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [DashboardService, DatePipe]
})
export class ReturnComponent implements OnInit {

    modalId = 'Issue Book';
    books: IBookDetails[];

    details: any;

    public title: IBookDetails;
    public searchString: string;

    aId: number
    adminList: any;

    mId: number;
    memberList: any;

    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;

    saveSuccess: boolean = false;
    today: any;

    rows: any = '';
    constructor(private dashboardService: DashboardService,
        private userService: UserService,
        public modalService: ModalService,
        public datePipe: DatePipe) {
    }

    ngOnInit() {
        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:MM a')
        this.getDetails();
    }

    openmodal(modalId: string, a): void {
        this.rows = a;
        this.modalService.open(modalId);
    }
    getDetails(): void {
        this.dashboardService.getDetails()
            .subscribe(
            result => this.details = result,
            error => console.log("Error :: " + error)
            )
    }
    returnBook({ value, valid }: { value: any, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';

        if (valid) {
            this.dashboardService.IssueBook(value.isbn, value.bookId, value.memberId, value.adminId, value.issueDate)
                .finally(() => this.isRequesting = false)
                .subscribe(
                result => {
                    if (result) {
                        this.saveSuccess = true;
                    }
                },
                errors => this.errors = errors);
        }
    }

}