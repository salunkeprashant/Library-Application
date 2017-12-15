import { Component, Input, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { IBookDetails } from '../models/book.details.interface';
import { IBookCategoryDetails } from '../models/bookcategory.details.inteface';
import { DashboardService } from '../services/dashboard.service';
import { ModalService } from '../services/modal.service'
import { UserService } from '../../shared/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-home',
   // styleUrls: ['../../../css/txnmodal.scss'],
    styleUrls: ['../../../css/modal.scss'],
    templateUrl: '../../../view/transaction.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [DashboardService, DatePipe]
})
export class TransactionComponent implements OnInit {

    modalId = 'Issue Book';
    books: IBookDetails[];

    public title: IBookDetails;
    public searchString: string;

    aId: number
    adminList: any;

    mId: number;
    memberName: any;
    memberList: any;

    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;

    saveSuccess: boolean = false;
    today;

    row: any = '';
    constructor(private dashboardService: DashboardService,
        private userService: UserService,
        public modalService: ModalService,
        public datePipe: DatePipe) {
        
    }

    ngOnInit() {
        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a')
        this.getBooks();
        this.getMemberList();
        this.getAdmins();
    }

    openmodal(modalId: string, a): void {
        this.row = a;
        this.modalService.open(modalId);
    }
    getBooks(): void {
        this.dashboardService.getBookDetails()
            .subscribe(
            result => this.books = result,
            error => console.log("Error :: " + error)
            )
    }
    getAdmins(): void {
        this.dashboardService.getAdmins()
            .subscribe(
            result => this.adminList = result,
            error => console.log("Error :: " + error)
            )
    }
    getMemberList(): void {
        this.dashboardService.getMemberDetails()
            .subscribe(
            result => this.memberList = result,
            error => console.log("Error :: " + error)
            )
    }

    bookId: any;
    issueBook({ value, valid }: { value: any, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        this.bookId = this.row.bookId
        console.log(this.bookId)
        if (valid) {
            this.dashboardService.IssueBook(value.isbn, this.bookId, value.memberId, value.adminId, value.issueDate)
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