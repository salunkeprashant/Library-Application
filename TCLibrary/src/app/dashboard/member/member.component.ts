import { Component, Input, OnInit, HostListener, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular5-toaster';

import { IMemberDetails } from '../models/member.details.interface';
import { DashboardService } from '../services/dashboard.service';
import { UserService } from '../../shared/services/user.service';
import { DatePipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  styleUrls: ['../../../css/modal.scss'],
  templateUrl: '../../../view/member.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [DashboardService, DatePipe]
})
export class MemberComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  members: any;
  public title: IMemberDetails;
  public searchString: string;
  private modalRef: NgbModalRef;

  errors: string;
  addMemberbusyPromise: Promise<any>;
  updateMemberbusyPromise: Promise<any>;
  deleteMemberbusyPromise: Promise<any>;

  saveSuccess: boolean = false;
  member: any = '';
  memberId: any = '';

  private toasterService: ToasterService;

  today;
  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
    public modalService: NgbModal,
    public datePipe: DatePipe,
    toasterService: ToasterService
  ) {
    this.toasterService = toasterService;
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
      dom: "<'row'<'col-sm-3'B>>" + "<'row'<'col-sm-12'tr>>" +
        "<'row table-control-row'<'col-sm-3'i><'col-sm-3'l><'col-sm-6'p>>",
      lengthMenu: [[10, 20, 30], [10, 20, 30]],
      info: true,
      paging: true,
      searching: true,
      destroy: true,
      order: [[1, "asc"], [2, "asc"]],
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
            columns: [0, 1, 2, 3, 4, 5, 6, 7]
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
            columns: [0, 1, 2, 3, 4, 5, 6, 7]
          }
        }
      ]
    },
      this.getMembers();
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  }

  openmodal(content, member?): void {
    if (member !== undefined) {
      this.member = member;
      this.member.joiningDate = this.datePipe.transform(member.joiningDate, 'yyyy-MM-dd');
      this.memberId = member.memberId;
    }
    this.modalRef = this.modalService.open(content);
  }


  getMembers(): void {
    this.dashboardService.getMemberDetails()
      .subscribe(
      result => {
        this.members = result;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      },
      error => console.log("Error :: " + error)
      )
  }

  NewmemberId: any;
  addMember({ value, valid }: { value: IMemberDetails, valid: boolean }) {
    this.NewmemberId = (this.members).length + 1;
    console.log(this.NewmemberId);
    this.errors = '';

    if (valid) {
      this.addMemberbusyPromise = this.dashboardService.AddMember(this.NewmemberId, value.joiningDate, value.firstName, value.lastName, value.mobileNo, value.emailAddress, value.addressLine, value.cityName, value.stateName)
        .toPromise()
        .then(
        result => {
          if (result) {
            this.toasterService.pop('success', 'Member Added', `${value.firstName} ${value.lastName}`);
            this.modalRef.dismiss();
            this.rerender();
          }
        },
        errors => this.errors = errors);
    }
  }

  deleteMember({ value }: { value: null }) {
    this.errors = '';
    this.deleteMemberbusyPromise = this.dashboardService.deleteMember(this.memberId)
      .toPromise()
      .then(
      result => {
        if (result) {
          this.toasterService.pop('error', 'Member Delete', `${this.member.firstName} ${this.member.lastName}`);
          this.modalRef.dismiss();
          this.rerender();
        }
      },
      errors => this.errors = errors);
  }

  updateMember({ value }: { value: any }) {
    console.log(value, this.memberId);
    this.errors = '';
    this.updateMemberbusyPromise = this.dashboardService.UpdateMember(this.memberId, value.addressLine, value.cityName, value.emailAddress, value.firstName, value.lastName, value.mobileNo, value.joiningDate, value.stateName)
      .toPromise()
      .then(
      result => {
        if (result) {
          this.toasterService.pop('success', 'Member Update', `${this.member.firstName} ${this.member.lastName}`);
          this.modalRef.dismiss();
          this.rerender();
        }
      },
      errors => this.errors = errors);
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // get books & Call the dtTrigger to rerender again
      this.dashboardService.getMemberDetails().subscribe(
        result => {
          this.members = result;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });
    });
  }


}
