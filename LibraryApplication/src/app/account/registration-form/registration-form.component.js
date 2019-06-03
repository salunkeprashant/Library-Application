"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("../../shared/services/user.service");
var forms_1 = require("@angular/forms");
var RegistrationFormComponent = /** @class */ (function () {
    function RegistrationFormComponent(userService, router, formBuilder) {
        this.userService = userService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.submitted = false;
        this.disableBtn = true;
        this.registrationForm = this.formBuilder.group({
            password: [null, forms_1.Validators.compose([
                    // 1. Password Field is Required
                    forms_1.Validators.required,
                    // 2. check whether the entered password has a number
                    this.patternValidator(/\d/, { hasNumber: true }),
                    // 3. check whether the entered password has upper case letter
                    this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                    // 4. check whether the entered password has a lower-case letter
                    this.patternValidator(/[a-z]/, { hasSmallCase: true }),
                    // 5. check whether the entered password has a special character
                    this.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
                    // 6. Has a minimum length of 8 characters
                    forms_1.Validators.minLength(8)
                ])
            ],
            confirmPassword: [null, forms_1.Validators.compose([forms_1.Validators.required])],
            firstName: ['', [forms_1.Validators.required]],
            lastName: ['', [forms_1.Validators.required]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]]
        }, // check whether our password and confirm password match
        { validator: this.passwordMatchValidator });
    }
    RegistrationFormComponent.prototype.patternValidator = function (regex, error) {
        return function (control) {
            if (!control.value) {
                // if control is empty return no error
                return null;
            }
            // test the value of the control against the regexp supplied
            var valid = regex.test(control.value);
            // if true, return no error (no error), else return error passed in the second parameter
            return valid ? null : error;
        };
    };
    RegistrationFormComponent.prototype.passwordMatchValidator = function (control) {
        var password = control.get('password').value; // get password from our password form control
        var confirmPassword = control.get('confirmPassword').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
        }
    };
    RegistrationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.registrationForm.valueChanges
            .subscribe(function (changedObj) {
            _this.disableBtn = _this.registrationForm.invalid;
        });
    };
    Object.defineProperty(RegistrationFormComponent.prototype, "regForm", {
        // convenience getter for easy access to form fields
        get: function () { return this.registrationForm.controls; },
        enumerable: true,
        configurable: true
    });
    RegistrationFormComponent.prototype.registerUser = function () {
        var _this = this;
        this.submitted = true;
        var value = this.registrationForm.value;
        if (!this.registrationForm.invalid) {
            this.busyPromise = this.userService.register(value.email, value.password, value.firstName, value.lastName, value.confirmpassword)
                .toPromise().then(function (result) {
                if (result) {
                    _this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
                }
            }, function (errors) { return _this.errors = errors.error; });
        }
    };
    RegistrationFormComponent = __decorate([
        core_1.Component({
            selector: 'app-registration-form',
            templateUrl: '../../../view/registration-form.component.html'
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router, forms_1.FormBuilder])
    ], RegistrationFormComponent);
    return RegistrationFormComponent;
}());
exports.RegistrationFormComponent = RegistrationFormComponent;
//# sourceMappingURL=registration-form.component.js.map