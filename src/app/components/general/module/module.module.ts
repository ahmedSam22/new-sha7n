import { WarehousesComponent } from './../../admin/warehouses/warehouses.component';
import { AuthRoutingModule } from './../../auth/module/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { CommonqComponent } from '../commonq/commonq.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { OurServicesComponent } from '../our-services/our-services.component';
import { OrdersComponent } from '../orders/orders.component';
import { AboutUsComponent } from '../../about-us/about-us.component';
import { TermsandconditionsComponent } from '../termsandconditions/termsandconditions.component';
import { ForbiddenproductsComponent } from '../forbiddenproducts/forbiddenproducts.component';
import { OutwarehousesComponent } from '../outwarehouses/outwarehouses.component';
import { ImportsComponent } from '../../imports/imports.component';
import { OutshipingComponent } from '../outshiping/outshiping.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
OurServicesComponent,
OrdersComponent,
AboutUsComponent,
ContactUsComponent,
TermsandconditionsComponent,
CommonqComponent,
ForbiddenproductsComponent,
OutwarehousesComponent,
ImportsComponent,
OutshipingComponent,
WarehousesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule ,
    ReactiveFormsModule,
    ModuleRoutingModule,
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
export class ModuleModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,"./assets/translate/",".json");
}