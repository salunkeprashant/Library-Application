import { Component, Input, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { IBookDetails } from '../models/book.details.interface';
import { IBookCategoryDetails } from '../models/bookcategory.details.inteface';
import { DashboardService } from '../services/dashboard.service';
import { UserService } from '../../shared/services/user.service';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-home',
    styleUrls: ['../../../css/modal.scss'],
    templateUrl: '../../../view/transaction.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [DashboardService, DatePipe]
})
export class TransactionComponent implements OnInit {

    books: any;

    public title: any;
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
    private modalRef: NgbModalRef;

    row: any = '';
    constructor(private dashboardService: DashboardService,
        private userService: UserService,
        public modalService: NgbModal,
        public datePipe: DatePipe) {

    }

    ngOnInit() {
        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a')
        this.getBooks();
        this.getMemberList();
        this.getAdmins();
    }

    openmodal(content, row?): void {
        console.log(row.isbn);
        this.row = row;
        this.modalRef = this.modalService.open(content);
    }
    getBooks(): void {
      this.dashboardService.getBookDetails()
        .subscribe(
        result => {
        this.books = result,
          console.log(this.books);
        })
    }

    getAdmins(): void {
        this.dashboardService.getAdmins()
            .subscribe(
            result => this.adminList = result,
            )
    }

    getMemberList(): void {
        this.dashboardService.getMemberDetails()
            .subscribe(
            result => this.memberList = result,
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
                        this.modalRef.dismiss();
                    }
                },
                errors => this.errors = errors);
        }
    }

}
