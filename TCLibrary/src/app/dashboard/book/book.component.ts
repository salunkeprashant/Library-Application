import { Component, Input, OnInit, HostListener } from '@angular/core';
import { IBookDetails } from '../models/book.details.interface';
import { DashboardService } from '../services/dashboard.service';
import { ModalService } from '../services/modal.service'

@Component({
    selector: 'app-home',
    styleUrls: ['../../../css/modal.scss'],
    templateUrl: '../../../view/book.component.html',
    providers: [DashboardService]
})
export class BookComponent implements OnInit {
    modalId = 'hoplaModal';
    books: IBookDetails[];

    constructor(private dashboardService: DashboardService, public modalService: ModalService) {
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

    addBook(): void {
        this.dashboardService.AddBook()
            .subscribe(
            result => this.books = result,
            error => console.log("Error :: " + error)
            )
    }
}
