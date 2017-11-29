import { Component, OnInit } from '@angular/core';

import { HomeDetails } from '../models/home.details.interface';
import { DashboardService } from '../services/dashboard.service';


@Component({
    selector: 'app-home',
    templateUrl: '../../../view/dashboard-home.component.html',
})
export class HomeComponent implements OnInit {

    homeDetails: HomeDetails;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {

        this.dashboardService.getHomeDetails()
            .subscribe((homeDetails: HomeDetails) => {
                this.homeDetails = homeDetails;
            },
            error => {
                //this.notificationService.printErrorMessage(error);
            });

    }
}
