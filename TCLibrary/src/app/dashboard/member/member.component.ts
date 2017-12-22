import { Component, Input, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { IMemberDetails } from '../models/member.details.interface';
import { DashboardService } from '../services/dashboard.service';
import { UserService } from '../../shared/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-home',
    styleUrls: ['../../../css/modal.scss'],
    templateUrl: '../../../view/member.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [DashboardService, DatePipe]
})
export class MemberComponent implements OnInit {
    members: any;

    public title: IMemberDetails;
    public searchString: string;
    private modalRef: NgbModalRef;

    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;

    saveSuccess: boolean = false;
    member: any = '';
    memberId: any = '';

    today;
    constructor(
        private dashboardService: DashboardService,
        private userService: UserService,
        public modalService: NgbModal,
        public datePipe: DatePipe,
    ) { }

    ngOnInit() {
        this.getMembers();
        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    }

    openmodal(content, member?, memberId?): void {
        this.member = member;
        this.memberId = member.memberId;
        this.modalRef = this.modalService.open(content);
    }


    getMembers(): void {
        this.dashboardService.getMemberDetails()
            .subscribe(
            result => this.members = result,
            error => console.log("Error :: " + error)
            )
    }

    NewmemberId: any;
    addMember({ value, valid }: { value: IMemberDetails, valid: boolean }) {
        this.NewmemberId = (this.members).length +1;
        console.log(this.NewmemberId);
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.dashboardService.AddMember(this.NewmemberId, value.joiningDate, value.firstName, value.lastName, value.mobileNo, value.emailAddress, value.addressLine, value.cityName, value.stateName)
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

    deleteMember({ value }: { value: null }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        this.dashboardService.deleteMember(this.memberId)
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
