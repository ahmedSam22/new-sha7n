import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GlobalserviceService } from '../globalservice/globalservice.service';
import { GlobalService } from '../shared/services/global.service';
@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css'],
})
export class VerifyCodeComponent implements OnInit {
  verify!: FormGroup;
  fromPage: any;
  concat = '';
  userData:any;
  phoneNumber:any;
  verification_code = {};
  id_code!: any;
  timeLeftMinutes: number = 90;
  // timeLeftSeconds: number = 30;
  interval: any;
  constructor(
    private service: GlobalService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.fromPage = window.location.href.toString().split('/').slice(-1);
  }

  ngOnInit(): void {
    this.userData = localStorage.getItem("qadiautkCurrentUser")
    this.phoneNumber = '0960' + ""+JSON.parse(this.userData).data.user.phone;
    
    this.verify = new FormGroup({
      verify_input1: new FormControl(null, Validators.required),
      verify_input2: new FormControl(null, Validators.required),
      verify_input3: new FormControl(null, Validators.required),
      verify_input4: new FormControl(null, Validators.required),
    });
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id_code = params.get('id');
      console.log('ccccccccccccccccccccc', this.id_code);
    });
    this.minutesTimer();
  }
  minutesTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeftMinutes > 0) {
        this.timeLeftMinutes--;
      } else {
        this.timeLeftMinutes = 90;
      }
    }, 1000);
  }
  //  secondsTimer(){
  //     this.interval = setInterval(() => {
  //       if(this.timeLeftSeconds > 0) {
  //         this.timeLeftSeconds--;
  //       } else {
  //          this.timeLeftSeconds = 30;
  //         }
  //     },1000)

  //   }
  onSubmit(){
    this.concat =
      this.verify.value.verify_input1 +
      this.verify.value.verify_input2 +
      this.verify.value.verify_input3 +
      this.verify.value.verify_input4;
    this.verification_code = { code: this.concat };
    console.log(this.verification_code);
    this.service
      .verificationCode({ ...this.verification_code })
      .subscribe((res) => {
        console.log(res);
        Swal.fire('نجاح', 'تم إدخال كود التحقق بنجاح', 'success');
        console.log('success');
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
      });
  }

}
