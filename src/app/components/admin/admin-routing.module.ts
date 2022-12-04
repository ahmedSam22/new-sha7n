import { ShippingFeeCalculatorComponent } from './shipping-fee-calculator/shipping-fee-calculator.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ComercialShippmentComponent } from './comercial-shippment/comercial-shippment.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { FAQComponent } from './faq/faq.component';
import { ImportationComponent } from './importation/importation.component';
import { NotificationComponent } from './notification/notification.component';
import { OrdersAdminComponent } from './orders/orders.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { WalletComponent } from './wallet/wallet.component';
import { WarehousesComponent } from './warehouses/warehouses.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
