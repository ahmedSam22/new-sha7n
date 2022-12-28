import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetpasswordComponent implements OnInit {
  id_code!: any;
  reset!: FormGroup;
  thisLang: any;
  show: boolean = false;
  phoneNumber:any;

  showConfirm: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private service: AuthService,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService
  ) {
    if(localStorage.getItem("qadiautkCurrentUser")){
      this.router.navigate(['/home']);
    }

    this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['phone'];
    });
 
    this.thisLang = localStorage.getItem('currentLang') || navigator.language;
    console.log(this.thisLang, 'from ocnst');

    translate.use(this.thisLang || navigator.language);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // if (event.lang == 'ar') {
      //   this.thisLang = 'rtl';
      //   console.log(this.thisLang, 'test1');
      // } else {
      //   this.thisLang = 'ltr';
      //   console.log(this.thisLang, 'test2');
      // }
    });
  }

  ngOnInit(): void {
    this.reset = new FormGroup({
      phone: new FormControl(this.phoneNumber),
      code: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirm_password: new FormControl(null, Validators.required),
    });

    
  }

  back() {
    this._location.back();
  }

  onSubmit() {
    console.log(this.reset.value);
    if (
      this.reset.controls.password.value ==
      this.reset.controls.confirm_password.value
    ) {
      this.service.confirmSms({ ...this.reset.value }).subscribe(
        (res: any) => {
          console.log('log response ', res);
          if (res.status == true) {
            Swal.fire(
              'تم تغيير كلمة السر بنجاح ',
              'تم تغيير كلمة المرور ',
              'success'
            );

            this.router.navigate(['/login/1']);
          } else {
          }
        },
        (error) => {
          // console.log(error);
          Swal.fire(error.error.errors[0]);
          console.log(error.error.errors[0]);

        }
      );
    } else {
      Swal.fire('فشل', 'كلمة السر غير متطابقة', 'warning');
    }
  }
}
