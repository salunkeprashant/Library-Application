import { Component, ViewEncapsulation } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular5-toaster';
import { transition } from '@angular/animations/src/animation_metadata';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../css/style.scss'],
  templateUrl: '../view/app.component.html',
})
export class AppComponent {
  title = 'app works!';

  private toasterService: ToasterService;

  constructor(toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 10000,
      progressBar:true
    });
}
