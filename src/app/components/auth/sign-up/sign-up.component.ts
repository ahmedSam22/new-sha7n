import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import {  first } from 'rxjs/operators';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUp!: FormGroup;
  id_code:any;
  thisLang:any;
  code:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private service: AuthService,
    public translate: TranslateService
  ) {
    this.thisLang = localStorage.getItem('currentLang') || navigator.language;
    console.log(this.thisLang, 'from const');

    translate.use(this.thisLang || navigator.language);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar') {
        this.thisLang = 'rtl';
        console.log(this.thisLang, 'test1');
      } else {
        this.thisLang = 'ltr';
        console.log(this.thisLang, 'test2');
      }
    });
  }
  selectedCountryCode:any = 'sa';
  countryCodes = ['us', 'sa'];
  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
  }
  ngOnInit(): void {
    this.signUp = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(9),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirm_password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.route.paramMap.subscribe(params => {
      this.id_code = params.get('id');
   
  });
  }

  back() {
    this.router.navigate(['/home']);
  }

  accept:boolean = false;

  switchaccept(){
    this.accept = !this.accept;
    console.log(this.accept);
  }

  show:boolean = false
  showConfirm:boolean = false

  sendSms(){
    console.log(this.signUp.controls.phone.value , "test hena ");
    
    this.service.sendSms(this.signUp.controls.phone.value).subscribe((res:any) => {
      console.log("log response " , res) ;
    
  })}
  onSubmit() {
    if (this.signUp.valid && this.accept) {
      this.service
        .singUp({ ...this.signUp.value })
        .pipe(first())
        .subscribe({
          next:  (res) => {
            if(res?.status === false){
              
              Swal.fire('fail', res.errors[0], 'warning');
              return ;
            }     
              this.service.sendSms({'phone' : `${this.signUp.controls.phone.value}`}).subscribe(e=>{
                console.log(e , "send sms from here")
              })
              Swal.fire('نجاح', 'تم التسجيل بنجاح', 'success');
              this.router.navigate(['/verify-code',this.id_code]);
          },
          error: (error) => {

            Swal.fire('fail', 'Invalid Data', 'warning');
          },
        });
    }else{
      Swal.fire('fail', 'complete your data correctly', 'warning');

    }
  }
}
