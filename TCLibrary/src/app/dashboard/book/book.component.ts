import { Component, Input, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { IBookDetails } from '../models/book.details.interface';
import { IBookCategoryDetails } from '../models/bookcategory.details.inteface';
import { DashboardService } from '../services/dashboard.service';
import { ModalService } from '../services/modal.service'
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-home',
    styleUrls: ['../../../css/modal.scss'],
    templateUrl: '../../../view/book.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [DashboardService]
})
export class BookComponent implements OnInit {
    modalId = 'AddBookModal';
    books: IBookDetails[];

    public title: IBookDetails;
    public searchString: string;
    cId: Number;
    categoryList: any;

    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;
    saveSuccess : boolean = false;

    constructor(private dashboardService: DashboardService, private userService: UserService,public modalService: ModalService) {
    }

    ngOnInit() {
        this.getBooks();
        this.getCategoryList();
    }

    getBooks(): void {
        this.dashboardService.getBookDetails()
            .subscribe(
            result => this.books = result,
            error => console.log("Error :: " + error)
            )
    }

    getCategoryList(): void {
        this.dashboardService.getBookCatgory()
            .subscribe(
            result => this.categoryList = result,
            error => console.log("Error :: " + error)
            )
    }

    addBook({ value, valid }: { value: IBookDetails, valid: boolean }): void {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.dashboardService.AddBook(value.isbn, value.title, value.author, value.categoryId, value.bookId, value.pages, value.quantity)
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
