import { Component, OnInit } from '@angular/core';
import { IBookDetails } from '../models/book.details.interface';
import { IBookCategoryDetails } from '../models/bookcategory.details.inteface';
import { DashboardService } from '../services/dashboard.service';
import { ModalService } from '../services/modal.service'
import { UserService } from '../../shared/services/user.service';


@Component({
    selector: 'app-home',
    styleUrls: ['../../../css/mystyle.scss'],
    templateUrl: '../../../view/transaction.component.html',
})
export class TransactionComponent implements OnInit {

    modalId = 'AddBookModal';
    books: IBookDetails[];

    public title: IBookDetails;
    public searchString: string;
    cId: Number;
    categoryList: any;

    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;

    saveSuccess: boolean = false;

    private years: number[] = [];
    private yy: number;

    constructor(private dashboardService: DashboardService, private userService: UserService, public modalService: ModalService) {
    }

    ngOnInit() {
        this.getBooks();
    }

    getBooks(): void {
        this.dashboardService.getBookDetails()
            .subscribe(
            result => this.books = result,
            error => console.log("Error :: " + error)
            )
    }
}
