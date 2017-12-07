import { Component, Input, OnInit, HostListener } from '@angular/core';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { ModalService } from '../dashboard/services/modal.service';
@Component({
    selector: 'app-modal',
    templateUrl: '../../view/book.modal.html',
    providers: [DashboardService]
})
export class ModalComponent implements OnInit {
    @Input() modalId: string;
    @Input() modalTitle: string;
    @Input() blocking = false;
    isOpen = false;

    constructor(private modalService: ModalService) {
    }

    ngOnInit() {
        this.modalService.registerModal(this);
    }

    close(checkBlocking = false): void {
        this.modalService.close(this.modalId, checkBlocking);
    }

}
