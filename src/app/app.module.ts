import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatStepperModule } from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { HelpersComponent } from './components/shared/helpers/helpers.component';
import { GuardsComponent } from './components/shared/guards/guards.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { PersonalInfoComponent } from './components/admin/personal-info/personal-info.component';
import { ShippingFeeCalculatorComponent } from './components/admin/shipping-fee-calculator/shipping-fee-calculator.component';
import { ComercialShippmentComponent } from './components/admin/comercial-shippment/comercial-shippment.component';
import { ImportationComponent } from './components/admin/importation/importation.component';
import { WarehousesComponent } from './components/admin/warehouses/warehouses.component';
import { PaymentMethodComponent } from './components/admin/payment-method/payment-method.component';
import { WalletComponent } from './components/admin/wallet/wallet.component';
import { NotificationComponent } from './components/admin/notification/notification.component';
import { CustomerServiceComponent } from './components/admin/customer-service/customer-service.component';
import { FAQComponent } from './components/admin/faq/faq.component';
import { LogOutComponent } from './components/admin/log-out/log-out.component';
import { HomeAdminComponent } from './components/admin/home/home.component';
import { OrdersAdminComponent } from './components/admin/orders/orders.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { AdminSidebarComponent } from './components/shared/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './components/shared/admin-footer/admin-footer.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule} from '@angular/material/core';
import { AddComponent } from './components/admin/payment-method/add/add.component';
import { GlobalserviceService } from './components/globalservice/globalservice.service';
import { JwtInterceptor } from './jwt.interceptor';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalService } from './components/shared/services/global.service';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SuccessComponent } from './components/admin/payment-method/success/success.component';
import { FailComponent } from './components/admin/payment-method/fail/fail.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    OrdersComponent,
    OurServicesComponent,
    AboutUsComponent,
    ContactUsComponent,
    SignUpComponent,
    LoginComponent,
    HelpersComponent,
    GuardsComponent,
    VerifyCodeComponent,
    PersonalInfoComponent,
    ShippingFeeCalculatorComponent,
    ComercialShippmentComponent,
    ImportationComponent,
    WarehousesComponent,
    PaymentMethodComponent,
    NotificationComponent,
    CustomerServiceComponent,
    FAQComponent,
    LogOutComponent,
    HomeAdminComponent,
    OrdersAdminComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
    AdminHomeComponent,
    LandingHomeComponent,
    WalletComponent,
    AddComponent,
    SuccessComponent,
    FailComponent,
    ForgetpasswordComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxFlagPickerModule,
    CarouselModule,
    BrowserAnimationsModule,MatFormFieldModule,MatInputModule ,
    ReactiveFormsModule,
    MatStepperModule,
    MatSidenavModule,
    MatSlideToggleModule,MatDialogModule,MatDatepickerModule,MatNativeDateModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar:true
    }),
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem("currentLang") ||  navigator.language,
      //  defaultLanguage: "en",

      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
    }
    }),
    
  ],
  providers: [GlobalService ,{ provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,"./assets/translate/",".json");
}