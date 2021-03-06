import { Subscription } from 'rxjs';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgBusyModule } from 'ng-busy';

import { ICredentials } from '../../shared/models/credentials.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login-form',
    templateUrl: '../../../view/login-form.component.html',
})
export class LoginFormComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: ICredentials = { email: '', password: '' };
  busyPromise: Promise<any>;

  constructor(private userService: UserService, private router: Router,private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
         this.brandNew = param['brandNew'];   
         this.credentials.email = param['email'];         
      });      
  }

   ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  login({ value, valid }: { value: ICredentials, valid: boolean }) {
    this.errors='';
    if (valid) {
      this.busyPromise = this.userService.login(value.email, value.password)
        .then(result => {         
          if (result) {
             this.router.navigate(['/dashboard/book']);             
          }
        },
        error => this.errors = error);
    }
  }
}
