import { Component, Input, OnInit, HostListener, ViewEncapsulation, ViewChild } from '@angular/core';
import { IBookDetails } from '../models/book.details.interface';
import { IBookCategoryDetails } from '../models/bookcategory.details.inteface';
import { DashboardService } from '../services/dashboard.service';
import { UserService } from '../../shared/services/user.service';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular5-toaster';

@Component({
  selector: 'app-home',
  //styleUrls: ['../../../css/txnmodal.scss'],
  styleUrls: ['../../../css/modal.scss'],
  templateUrl: '../../../view/return.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [DashboardService, DatePipe]
})
export class ReturnComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
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
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();


  busyPromise: Promise<any>;
  private toasterService: ToasterService;

  constructor(private dashboardService: DashboardService,
    private userService: UserService,
    public datePipe: DatePipe,
    public modalService: NgbModal,
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
      scrollCollapse: true,
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
    this.dashboardService.getIssuedBookDetails().subscribe(
      result => {
        this.details = result,
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }

  transactionId: any;
  bookId: any;

  returnBook({ value }: { value: any, }) {
    this.errors = '';
    this.transactionId = this.rows.transactionId;
    this.bookId = this.rows.bookId;

    this.dashboardService.ReturnBook(this.transactionId, this.bookId, value.returnDate)
      .subscribe(
      result => {
        if (result) {
          this.toasterService.pop('success', `${value.memberName} Returns Book`, `${value.title}`);
          this.modalRef.dismiss();
          this.rerender();
        }
      },
      errors => this.errors = errors.error);
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // get books & Call the dtTrigger to rerender again
      this.dashboardService.getIssuedBookDetails().subscribe(
        result => {
          this.details = result,
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });
    });
  }

}
