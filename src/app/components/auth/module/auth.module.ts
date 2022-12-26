import { LandingComponent } from './../landing/landing.component';
// import { NgxOtpInputComponent } from './../../../../../node_modules/ngx-otp-input/src/lib/component/ngx-otp-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { LoginComponent } from '../login/login.component';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { VerifyCodeComponent } from '../verify-code/verify-code.component';

import { NgOtpInputModule } from  'ng-otp-input';

import { AuthRoutingModule } from './auth-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { NgxFlagPickerModule } from 'ngx-flag-picker';


@NgModule({
  declarations: [
    ForgetpasswordComponent,
    LoginComponent,
    ResetpasswordComponent,
    SignUpComponent,
    // VerifyCodeComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MatFormFieldModule,
    // NgxFlagPickerModule,
    MatInputModule ,
    CarouselModule,
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

export class AuthModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,"./assets/translate/",".json");
}