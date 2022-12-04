import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { LoginComponent } from '../login/login.component';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { VerifyCodeComponent } from '../verify-code/verify-code.component';

const routes: Routes = [
  { path: 'sign-up/:id', component: SignUpComponent},
  { path: 'forgetpassword', component: ForgetpasswordComponent},
  { path: 'reset', component: ResetpasswordComponent},
  { path: 'login/:id', component: LoginComponent},
  { path: 'verify-code/:id', component: VerifyCodeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
