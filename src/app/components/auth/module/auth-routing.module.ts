import { LandingComponent } from './../landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { LoginComponent } from '../login/login.component';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { VerifyCodeComponent } from '../verify-code/verify-code.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
