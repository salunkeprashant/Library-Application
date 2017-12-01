import { Component, ViewEncapsulation } from '@angular/core';

import { ModalService } from '../app/dashboard/services/modal.service'
@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
    templateUrl: '../view/app.component.html',
})
export class AppComponent {
    title = 'app works!';
   
}