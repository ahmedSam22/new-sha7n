import Swal from 'sweetalert2';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css'],
})
export class VerifyCodeComponent implements OnInit {
  verify!: FormGroup;
  fromPage: any;
  // concat = '';
  userData: any;
  public OTP : any = {
    length: 4,
    code: '',
  };
  phoneNumber: any;
  verification_code = {};
  id_code!: any;
  timeLeftMinutes: number = 90;
  interval: any;
  constructor(
    private service: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.fromPage = window.location.href.toString().split('/').slice(-1);
  }

  ngOnInit(): void {
    this.userData = localStorage.getItem('qadiautkCurrentUser');
    this.phoneNumber = '+966' + JSON.parse(this.userData).data.user.phone;

    // this.verify = new FormControl();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id_code = params.get('id');
      console.log('cc', this.id_code);
    });
    this.minutesTimer();
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
      phone: JSON.parse(this.userData).data.user.phone,
      confirm_code: this.OTP.code,
    };
    console.log(this.verification_code);
    this.service
      .confirmSignSms({ ...this.verification_code })
      .subscribe(async (res:any) => {
         if(await res.status === 200){
           if (this.id_code == 0) {
          setTimeout(() => {
            this.router.navigate(['admin/shipping']);
          }, 2000);
          this.service.old_order = this.id_code;
          console.log('Verification Old Order ID = ', this.service.old_order);
        } else {
          setTimeout(() => {
            this.router.navigate(['admin/orders']);
          }, 2000);
          this.service.new_order = this.id_code;
          console.log('Verification New Order ID = ', this.service.new_order);
        }
        }else{
          Swal.fire(` Fail `, res.errors[0], `warning`);;

        }
        
       
      }
      );
  }

  resendCode(){
    if(this.timeLeftMinutes  > 0){
      Swal.fire( `برجاء الانتظار ${this.timeLeftMinutes} ثانية`, '' , 'warning');
      return ;
    }else{
       this.service.sendSms({phone : JSON.parse(this.userData).data.user.phone}).subscribe(async (res:any)=>{
      if(await res.status === 200){
        Swal.fire('نجاح', 'تم ارسال الكود بنجاح', 'success');
        this.timeLeftMinutes = 90


      }
    })
    }
   
  }
}