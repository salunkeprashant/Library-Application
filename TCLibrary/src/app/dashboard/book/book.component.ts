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
    cId: number;
    categoryList: any;

    aId: number;
    authorList: any;

    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;

    saveSuccess: boolean = false;

    private years: number[] = [];
    private yy: number;

    constructor(private dashboardService: DashboardService, private userService: UserService,public modalService: ModalService) {
    }

    ngOnInit() {
        this.getYear();
        this.getBooks();
        this.getCategoryList();
        this.getAuthors();
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

    getAuthors(): void {
        this.dashboardService.getAuthors()
            .subscribe(
            result => this.authorList = result,
            error => console.log("Error :: " + error)
            )
    }

    addBook({ value, valid }: { value: IBookDetails, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.dashboardService.AddBook(value.isbn,value.authorId, value.title, value.author, value.categoryId, value.bookId, value.pages, value.quantity, value.ratings, value.yearofpublish)
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

    getYear() {
        var today = new Date();
        this.yy = today.getFullYear();
        for (var i = (this.yy - 400); i <= this.yy; i++) {
            this.years.push(i);
        }
    }
}
