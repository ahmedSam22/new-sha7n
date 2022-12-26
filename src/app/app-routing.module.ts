import { LoginComponent } from './components/auth/login/login.component';
import { AdminModule } from './components/admin/admin.module';
import { ModuleModule } from './components/general/module/module.module';
import { FailComponent } from './components/admin/payment-method/fail/fail.component';
import { SuccessComponent } from './components/admin/payment-method/success/success.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ComercialShippmentComponent } from './components/admin/comercial-shippment/comercial-shippment.component';
import { CustomerServiceComponent } from './components/admin/customer-service/customer-service.component';
import { FAQComponent } from './components/admin/faq/faq.component';
import { HomeAdminComponent } from './components/admin/home/home.component';
import { ImportationComponent } from './components/admin/importation/importation.component';
import { NotificationComponent } from './components/admin/notification/notification.component';
import { OrdersAdminComponent } from './components/admin/orders/orders.component';
import { PaymentMethodComponent } from './components/admin/payment-method/payment-method.component';
import { PersonalInfoComponent } from './components/admin/personal-info/personal-info.component';
import { ShippingFeeCalculatorComponent } from './components/admin/shipping-fee-calculator/shipping-fee-calculator.component';
import { WalletComponent } from './components/admin/wallet/wallet.component';
import { WarehousesComponent } from './components/admin/warehouses/warehouses.component';
import { LandingHomeComponent } from './components/general/landing-home/landing-home.component';


import { AuthModule } from './components/auth/module/auth.module';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/auth/landing/landing.component';
import { VerifyCodeComponent } from './components/auth/verify-code/verify-code.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgetpasswordComponent } from './components/auth/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/auth/resetpassword/resetpassword.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'admin', pathMatch: 'full', redirectTo: '/admin/adminHome'},
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: '', 
  component:HomeComponent, 
   children: [
    { path: '', loadChildren: ()=> AuthModule,},

    { path: 'home', component: LandingHomeComponent},
    { path: 'about', loadChildren: ()=> ModuleModule,},
  ]
},
{ path: 'landing', component: LandingComponent},
{ path: 'verify-code/:id', component: VerifyCodeComponent},
{ path: 'sign-up', component: SignUpComponent},
{ path: 'login/:id', component: LoginComponent},
{ path: 'forgetpassword', component: ForgetpasswordComponent},
{ path: 'reset', component: ResetpasswordComponent},



// { path: 'home', 
// component:HomeComponent, 


// },
  { path: 'admin', component: HomeAdminComponent,  children: [

    // { path: 'adminHome', component: AdminHomeComponent},
    // { path: 'profile', component: PersonalInfoComponent},
    // { path: 'orders', component: OrdersAdminComponent},
    // { path: 'shipping', component: ShippingFeeCalculatorComponent},
    // { path: 'commercial', component: ComercialShippmentComponent},

    // { path: 'warehouses', component: WarehousesComponent},
    // { path: 'import', component: ImportationComponent},

    // { path: 'paymentmethod', component: PaymentMethodComponent},
    // { path: 'wallet', component: WalletComponent},
    // { path: 'notification', component: NotificationComponent},
    // { path: 'customerservice', component: CustomerServiceComponent},
    // { path: 'FAQ', component: FAQComponent},
    { path: '', loadChildren: ()=> AdminModule,},

  ]},
  { path: 'paymentsuccess', component: SuccessComponent},
  { path: 'paymentfail', component: FailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
