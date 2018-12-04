import { Component, Input, OnInit, HostListener, ViewEncapsulation, ViewChild, QueryList } from '@angular/core';
import { IBookDetails } from '../models/book.details.interface';
import { IBookCategoryDetails } from '../models/bookcategory.details.inteface';
import { DashboardService } from '../services/dashboard.service';
import { UserService } from '../../shared/services/user.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { CommonModule, DatePipe } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { ApiService } from '../../shared/utils/api.service';

import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular5-toaster';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-home',
  styleUrls: ['../../../css/modal.scss'],
  templateUrl: '../../../view/book.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [DashboardService]
})
export class BookComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  deleteBusyPromise: Promise<any>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  books: IBookDetails[];
  isbn: any;
  book: any = '';

  public title: IBookDetails;
  public searchString: string;
  categoryList: any;
  authorList: any;

  enterCategory = (term) => ({ categoryId: term, categoryName: term });
  enterAuthor = (term) => ({ authorId: (this.authorList).length + 1, author: term });

  errors: string;
  private years: number[] = [];
  private yy: number;

  closeResult: string;
  private modalRef: NgbModalRef;

  busyPromise: Promise<any>;
  private toasterService: ToasterService;

  constructor(private dashboardService: DashboardService,
    private userService: UserService,
    private apiService: ApiService,
    public modalService: NgbModal,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.dtOptions = {
      columnDefs: [
        { defaultContent: "", targets: "_all" },
        { targets: [1, 3, 4, 6], orderable: true },
        { targets: "_all", orderable: false }
      ],
      language: {
        info: "Items _START_ to _END_ of _TOTAL_",
        lengthMenu: "Page Size:  _MENU_",
        processing: "",
        zeroRecords: "No data available"
      },
      dom: "<'row'<'col-sm-3'B>>" + "<'row'<'col-sm-12'<'allow-horizontal-scrolling'tr>>>" +
        "<'row table-control-row'<'col-sm-3'i><'col-sm-3'l><'col-sm-6'p>>",
      lengthMenu: [[10, 20, 30], [10, 20, 30]],
      info: true,
      scrollY: "500px",
      scrollCollapse: true,
      paging: true,
      searching: true,
      destroy: true,
      order: [[1, "asc"], [6, "asc"]],
    },
      this.getYear();
    this.getBooks();
    this.getCategoryList();
    this.getAuthors();
  }

  openmodal(content, book?): void {
    if (book !== undefined) {
      this.book = book;
      this.isbn = book.isbn;
    }
    this.errors = '';
    this.modalRef = this.modalService.open(content);
  }

  getBooks(): void {
    this.apiService.get(`/dashboard/book`).subscribe(
      result => {
        this.books = result;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }

  getCategoryList(): void {
    this.dashboardService.getBookCatgory()
      .subscribe(
      result => this.categoryList = result,
    )
  }

  getAuthors(): void {
    this.dashboardService.getAuthors()
      .subscribe(
      result => this.authorList = result,
    )
  }



  categoryName: any;
  author: any;
  addBook({ value, valid }: { value: any, valid: boolean }) {
    if (typeof value.categoryId === "string") {
      this.categoryName = value.categoryId;
      value.categoryId = (this.categoryList).length + 1
    }

    console.log(value);

    if (valid) {
      this.busyPromise = this.dashboardService.AddBook(value.isbn, value.title, value.authors, value.categoryId, this.categoryName, value.ratings, value.yearofpublish, value.pages, value.quantity)
        .toPromise()
        .then(result => {
          if (result) {
            this.toasterService.pop('success', 'Book Added', `${value.title}`);
            this.modalRef.dismiss();
            this.rerender();
          }
        },
        errors => this.errors = errors);
    }
  }

  updateBook({ value }: { value: any }) {
    if (typeof value.categoryId === "string") {
      this.categoryName = value.categoryId;
      value.categoryId = (this.categoryList).length + 1
    }
    console.log(value);
    this.errors = '';
    this.dashboardService.UpdateBook(value.isbn, value.title, value.authors, value.categoryId, this.categoryName, value.ratings, value.yearofpublish, value.pages, value.quantity)
      .toPromise()
      .then(result => {
        if (result) {
          this.toasterService.pop('success', 'Book Updated', `${this.book.title}`);
          this.modalRef.dismiss()
        }
      },
      errors => this.errors = errors);
  }

  deleteBook({ value }: { value: any }) {
    this.deleteBusyPromise = this.dashboardService.deleteBook(this.isbn)
      .toPromise()
      .then(result => {
        if (result) {
          this.toasterService.pop('error', 'Book Deleted', `${this.book.title}`);
          this.modalRef.dismiss();
          this.rerender();
        }
      },
      errors => this.errors = errors.error);
  }

  getYear() {
    var today = new Date();
    this.yy = today.getFullYear();
    for (var i = (this.yy - 400); i <= this.yy; i++) {
      this.years.push(i);
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // get books & Call the dtTrigger to rerender again
      this.apiService.get(`/dashboard/book`).subscribe(
        result => {
          this.books = result;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });
    });
  }
}
