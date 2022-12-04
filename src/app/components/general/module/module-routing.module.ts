import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from '../../about-us/about-us.component';
import { ImportsComponent } from '../../imports/imports.component';
import { CommonqComponent } from '../commonq/commonq.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { ForbiddenproductsComponent } from '../forbiddenproducts/forbiddenproducts.component';
import { OrdersComponent } from '../orders/orders.component';
import { OurServicesComponent } from '../our-services/our-services.component';
import { OutshipingComponent } from '../outshiping/outshiping.component';
import { OutwarehousesComponent } from '../outwarehouses/outwarehouses.component';
import { TermsandconditionsComponent } from '../termsandconditions/termsandconditions.component';

const routes: Routes = [
  { path: 'our-services', component: OurServicesComponent},//
    { path: 'orders', component: OrdersComponent}, //
    { path: 'about-us', component: AboutUsComponent},//
    { path: 'contact-us', component: ContactUsComponent},//
    { path: 'terms',  component: TermsandconditionsComponent},//
    { path: 'common' , component: CommonqComponent},//
    { path: 'products', component: ForbiddenproductsComponent},//
    { path: 'warehouses', component: OutwarehousesComponent},//
    { path: 'imports', component: ImportsComponent},//
    { path: 'shipping', component: OutshipingComponent},//
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
