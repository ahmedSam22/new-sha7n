import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
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
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'admin', pathMatch: 'full', redirectTo: '/admin/adminHome'},
  { path: '', pathMatch: 'full', redirectTo: '/home'},
 

  { path: '', component:HomeComponent, children: [
    { path: 'home', component: LandingHomeComponent},
    { path: 'our-services', component: OurServicesComponent},
    { path: 'orders', component: OrdersComponent},
    { path: 'about-us', component: AboutUsComponent},
    { path: 'contact-us', component: ContactUsComponent},
    { path: 'sign-up/:id', component: SignUpComponent},
    { path: 'login/:id', component: LoginComponent},
    { path: 'verify-code/:id', component: VerifyCodeComponent},
  ]},
  { path: 'admin', component: HomeAdminComponent,  children: [

    { path: 'adminHome', component: AdminHomeComponent},
    { path: 'profile', component: PersonalInfoComponent},
    { path: 'orders', component: OrdersAdminComponent},
    { path: 'shipping', component: ShippingFeeCalculatorComponent},
    { path: 'commercial', component: ComercialShippmentComponent},
    { path: 'warehouses', component: WarehousesComponent},
    { path: 'import', component: ImportationComponent},

    { path: 'paymentmethod', component: PaymentMethodComponent},
    { path: 'wallet', component: WalletComponent},
    { path: 'notification', component: NotificationComponent},
    { path: 'customerservice', component: CustomerServiceComponent},
    { path: 'FAQ', component: FAQComponent},




  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
