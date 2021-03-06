import { Component, Input, OnInit, HostListener, ViewEncapsulation, ViewChild } from '@angular/core';
import { IBookDetails } from '../models/book.details.interface';
import { IBookCategoryDetails } from '../models/bookcategory.details.inteface';
import { DashboardService } from '../services/dashboard.service';
import { UserService } from '../../shared/services/user.service';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular5-toaster';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-home',
  styleUrls: ['../../../css/modal.scss'],
  templateUrl: '../../../view/transaction.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [DashboardService, DatePipe]
})
export class TransactionComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  books: any;

  public title: any;
  public searchString: string;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

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
  
  busyPromise: Promise<any>;
  private toasterService: ToasterService;

  row: any = '';
  constructor(private dashboardService: DashboardService,
    private userService: UserService,
    public modalService: NgbModal,
    public datePipe: DatePipe,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.dtOptions = {
      columnDefs: [
        { defaultContent: "", targets: "_all" },
        { targets: [1, 3], orderable: true },
        { targets: "_all", orderable: false }
      ],
      language: {
        info: "Items _START_ to _END_ of _TOTAL_",
        lengthMenu: "Page Size:  _MENU_",
        processing: "",
        zeroRecords: "No data available"
      },
      dom: "<'row'<'col-sm-3'B>>" + "<'row'<'col-sm-12'tr>>" +
        "<'row table-control-row'<'col-sm-3'i><'col-sm-3'l><'col-sm-6'p>>",
      lengthMenu: [[10, 20, 30], [10, 20, 30]],
      info: true,
      paging: true,
      searching: true,
      destroy: true,
      order: [[1, "asc"], [3, "asc"]],
      // Configure the buttons
      buttons: [
        {
          extend: 'excel',
          text: '',
          className: 'fa fa-file-excel-o',
          init: function (api, node, config) {
            $(node).removeClass('dt-button')
          },
          exportOptions: {
            columns: [0, 1, 2, 3, 4]
          }
        },
        {
          extend: 'print',
          text: '',
          className: 'fa fa-print',
          init: function (api, node, config) {
            $(node).removeClass('dt-button')
          },
          exportOptions: {
            columns: [0, 1, 2, 3, 4]
          }
        }
      ]
    },
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
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
    this.dashboardService.getBookDetails().subscribe(
      result => {
        this.books = result;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
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
    var workingMember = this.memberList.filter(x => x.memberId == value.memberId)[0];
    if (valid) {
      this.dashboardService.IssueBook(this.row.isbn, this.row.bookId, value.memberId, value.adminId, value.issueDate)
        .subscribe(
        result => {
          if (result) {
            this.toasterService.pop('success', `${this.row.title} Book Issued To`, `${workingMember.firstName} ${workingMember.lastName}`);
            this.modalRef.dismiss();
            this.rerender();
          }
        },
        errors => this.errors = errors.error);
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // get books & Call the dtTrigger to rerender again
      this.dashboardService.getBookDetails().subscribe(
        result => {
          this.books = result;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });
    });
  }

}
