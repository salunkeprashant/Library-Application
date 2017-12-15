import { Component, Input, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { IBookDetails } from '../models/book.details.interface';
import { IBookCategoryDetails } from '../models/bookcategory.details.inteface';
import { DashboardService } from '../services/dashboard.service';
import { ModalService } from '../services/modal.service'
import { UserService } from '../../shared/services/user.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { CommonModule,DatePipe } from '@angular/common';

@Component({
    selector: 'app-home',
    styleUrls: ['../../../css/modal.scss'],
    templateUrl: '../../../view/book.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [DashboardService]
})
export class BookComponent implements OnInit {
    modalId = 'AddBookModal';
    modalId1 = 'UpdateBookModal';
    modalId2 = 'DeleteBookModal';

    books: any;

    book: any = '';
    bookId: any;

    public title: IBookDetails;
    public searchString: string;
    categoryList: any;
    authorList: any;

    enterCategory = (term) => ({ categoryId: term, categoryName: term });
    enterAuthor = (term) => ({ authorId: term, author: term });

    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;

    saveSuccess: boolean = false;

    private years: number[] = [];
    private yy: number;

    constructor(private dashboardService: DashboardService, private userService: UserService, public modalService: ModalService) {
    }

    ngOnInit() {
        this.getYear();
        this.getBooks();
        this.getCategoryList();
        this.getAuthors();
    }

   
    openmembermodal(modalId: string, member, Id): void {
        this.book = member;
        this.bookId = Id;
        this.modalService.open(modalId);
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

    categoryName: any;
    author: any;
    addBook({ value, valid }: { value: any, valid: boolean }) {
        if (typeof value.categoryId === "string") {
            this.categoryName = value.categoryId;
            value.categoryId = (this.categoryList).length + 1
        }
        if (typeof value.authorId === "string") {
            this.author = value.authorId;
            value.authorId = (this.authorList).length + 1
        }
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.dashboardService.AddBook(value.isbn, value.title, value.authorId, this.author, value.categoryId, this.categoryName, value.ratings, value.yearofpublish, value.pages, value.quantity, )
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

    updateBook({ value }: { value: any,}) {
        if (typeof value.categoryId === "string") {
            this.categoryName = value.categoryId;
            value.categoryId = (this.categoryList).length + 1
        }
        if (typeof value.authorId === "string") {
            this.author = value.authorId;
            value.authorId = (this.authorList).length + 1
        }
        console.log(value);
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
            this.dashboardService.UpdateBook(value.isbn, value.title, value.authorId, this.author, value.categoryId, this.categoryName, value.ratings, value.yearofpublish, value.pages, value.quantity, )
                .finally(() => this.isRequesting = false)
                .subscribe(
                result => {
                    if (result) {
                        this.saveSuccess = true;
                    }
                },
                errors => this.errors = errors);
    }

    getYear() {
        var today = new Date();
        this.yy = today.getFullYear();
        for (var i = (this.yy - 400); i <= this.yy; i++) {
            this.years.push(i);
        }
    }
}