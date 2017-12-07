﻿import { Injectable } from '@angular/core';
import { ModalComponent } from '../../directives/modal.component';

@Injectable()
export class ModalService {
    private modals: Array<ModalComponent>;
    row:any ='';

    constructor() {
        this.modals = [];
    }

    registerModal(newModal: ModalComponent): void {
        const modal = this.findModal(newModal.modalId);

        // Delete existing to replace the modal
        if (modal) {
            this.modals.splice(this.modals.indexOf(modal));
        }

        this.modals.push(newModal);
    }

    open(modalId: string): void {
        const modal = this.findModal(modalId);

        if (modal) {
            modal.isOpen = true;
        }
    }
    
    getdetails() {
    }
    close(modalId: string, checkBlocking = false): void {
        const modal = this.findModal(modalId);

        if (modal) {
            if (checkBlocking && modal.blocking) {
                return;
            }

            modal.isOpen = false;
        }
    }

    private findModal(modalId: string): ModalComponent {
        for (const modal of this.modals) {
            if (modal.modalId === modalId) {
                return modal;
            }
        }
        return null;
    }
}
