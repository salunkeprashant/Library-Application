"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var availableBook_component_1 = require("./public/availableBook.component");
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'book', component: availableBook_component_1.AvailableBookComponent },
    { path: 'account', loadChildren: 'app/account/account.module#AccountModule' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map