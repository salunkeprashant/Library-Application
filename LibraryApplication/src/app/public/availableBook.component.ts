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
  dtOptions: any = {};
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
    this.dtOptions = {
      columnDefs: [
        { defaultContent: "", targets: "_all" },
        { targets: [1, 3, 4], orderable: true },
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
      order: [[1, "asc"], [4, "asc"]],
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
            columns: [0,1, 2, 3, 4]
          }
        }
      ]
    },
      this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a')
    this.getAvailableBooks();
  }

  getAvailableBooks(): any {
    this.apiService.get(`/public/availablebooks`).subscribe(
      result => {
        this.books = result
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }
}
