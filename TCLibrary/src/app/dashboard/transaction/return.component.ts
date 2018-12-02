import { Component, Input, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { IBookDetails } from '../models/book.details.interface';
import { IBookCategoryDetails } from '../models/bookcategory.details.inteface';
import { DashboardService } from '../services/dashboard.service';
import { UserService } from '../../shared/services/user.service';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  //styleUrls: ['../../../css/txnmodal.scss'],
  styleUrls: ['../../../css/modal.scss'],
  templateUrl: '../../../view/return.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [DashboardService, DatePipe]
})
export class ReturnComponent implements OnInit {

  books: IBookDetails[];

  public title: IBookDetails;
  public searchString: string;

  details: any;

  aId: number
  adminList: any;

  mId: number;
  memberList: any;

  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

  saveSuccess: boolean = false;
  today: any;
  private modalRef: NgbModalRef;

  constructor(private dashboardService: DashboardService,
    private userService: UserService,
    public datePipe: DatePipe,
    public modalService: NgbModal) {
  }

  ngOnInit() {
    this.getDetails();
  }

  rows: any;
  openmodal(content, rows?): void {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a')
    this.rows = rows;
    console.log(this.rows);
    this.modalRef = this.modalService.open(content);
  }

  getDetails(): void {
    this.dashboardService.getDetails()
      .subscribe(
      result => this.details = result,
      error => console.log("Error :: " + error)
      )
  }

  transactionId: any;
  bookId: any;
  returnBook({ value }: { value: any, }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    this.transactionId = this.rows.transactionId;
    this.bookId = this.rows.bookId;

    this.dashboardService.ReturnBook(this.transactionId, this.bookId, value.returnDate)
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
