import { Component, Input, OnInit, HostListener, ViewEncapsulation } from '@angular/core';

import { IMemberDetails } from '../models/member.details.interface';
import { DashboardService } from '../services/dashboard.service';
import { ModalService } from '../services/modal.service'
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: '../../../view/member.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [DashboardService]
})
export class MemberComponent implements OnInit {
    modalId = 'AddMemberModal';
    members: IMemberDetails[];

    public title: IMemberDetails;
    public searchString: string;

    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;

    saveSuccess: boolean = false;

    constructor(private dashboardService: DashboardService, private userService: UserService, public modalService: ModalService) {
    }

    ngOnInit() {
        this.getBooks();
    }
    getBooks(): void {
        this.dashboardService.getMemberDetails()
            .subscribe(
            result => this.members = result,
            error => console.log("Error :: " + error)
            )
    }
    addMember({ value, valid }: { value: IMemberDetails, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.dashboardService.AddMember(value.memberId, value.joiningDate, value.firstName, value.lastName, value.mobileNo, value.emailAddress, value.addressLine, value.cityName, value.stateName)
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
