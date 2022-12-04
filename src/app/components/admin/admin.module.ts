import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ShippingFeeCalculatorComponent } from './shipping-fee-calculator/shipping-fee-calculator.component';
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
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
declarations: [
ShippingFeeCalculatorComponent,
AdminHomeComponent,
PersonalInfoComponent,
ComercialShippmentComponent,
CustomerServiceComponent,
FAQComponent,
ImportationComponent,
NotificationComponent,
OrdersAdminComponent,
PaymentMethodComponent,
WalletComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatDatepickerModule,
    CarouselModule,
    MatNativeDateModule,
    MatInputModule ,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem("currentLang") ||  navigator.language.split("-")[0],
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
    }
    }),
  ]
})
export class AdminModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,"./assets/translate/",".json");
}