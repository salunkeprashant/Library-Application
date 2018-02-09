import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../css/style.scss'],
    templateUrl: '../view/app.component.html',
})
export class AppComponent {
    title = 'app works!';
   
}