import Swal from 'sweetalert2';
import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css'],
})
export class VerifyCodeComponent implements OnInit {
  verify!: FormGroup;
  fromPage: any;
  // concat = '';
  thisLang:any;

  userData: any;
  @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent | undefined;
  // config :NgOtpInputConfig = {
  //   allowNumbersOnly: false,
  //   length: 4,
  //   isPasswordInput: false,
  //   disableAutoFocus: false,
  //   placeholder: ''
  // };
  public OTP : any = {
    length: 4,
    code: '',
    inputClass: 'inputOtp',
  };
  phoneNumber: any;
  phone_param:any;
  verification_code = {};
  id_code!: any;
  timeLeftMinutes: number = 90;
  interval: any;
  constructor(
    private location: Location,
    private service: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public translate: TranslateService,

  ) {  
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar') {
        this.thisLang = 'rtl';
        console.log(this.thisLang, 'test1');
      } else {
        this.thisLang = 'ltr';
        console.log(this.thisLang, 'test2');
      }
    });
    this.fromPage = window.location.href.toString().split('/').slice(-1);
    this.thisLang = localStorage.getItem('currentLang') || navigator.language;
    translate.use(this.thisLang || navigator.language);

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res:Params) => {
      this.phone_param=res.params.id      ;
      this.id_code = 3;
      console.log('cccccccccc', this.phone_param);
    });
    this.minutesTimer();
    // '0966' +
    this.phoneNumber =this.phone_param;
    this.userData = localStorage.getItem('qadiautkCurrentUser');
    this.phoneNumber =  this.phone_param;

    // this.verify = new FormControl();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id_code = params.get('id');
      console.log('cc', this.id_code);
    });
    this.minutesTimer();
  }
  back() {
    this.location.back();
  }
  minutesTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeftMinutes > 0) {
        this.timeLeftMinutes--;
      } else {
        this.timeLeftMinutes = 0;
        return
      }
    }, 1000);
  }

  onSubmit() {
    // this.concat
     
    this.verification_code = {
      phone: this.phoneNumber,
      confirm_code: this.OTP.code,
    };
    console.log(this.verification_code);
    this.service
      .confirmSignSms({ ...this.verification_code })
      .subscribe(async (res:any) => {
         if(await res.status != 200){ //should changed on live
          this.router.navigate(['/sign-up'],{queryParams : {phone: this.phoneNumber}});
        //    if (this.id_code == 0) {
        //  ;
        //   this.service.old_order = this.id_code;
        //   console.log('Verification Old Order ID = ', this.service.old_order);
        // } else {
        //   setTimeout(() => {
        //     this.router.navigate(['admin/orders']);
        //   }, 2000);
        //   this.service.new_order = this.id_code;
        //   console.log('Verification New Order ID = ', this.service.new_order);
        // }
        }else{
          Swal.fire(` Fail `, res.errors[0], `warning`);;

        }
        
       
      }
      );
  }

  resendCode(){
    if(this.timeLeftMinutes  > 0){
      Swal.fire( `برجاء الانتظار ${this.timeLeftMinutes} ثانية`, '' , 'warning');      return ;
    }else{
      
       this.service.sendSms(this.phone_param).subscribe(async (res:any)=>{
      if(await res.status === 200){
        Swal.fire('نجاح', 'تم ارسال الكود بنجاح', 'success');
        this.timeLeftMinutes = 90


      }
    })
    }
   
  }
}
