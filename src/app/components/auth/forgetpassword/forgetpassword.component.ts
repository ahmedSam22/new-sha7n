import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { GlobalserviceService } from '../../globalservice/globalservice.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
 
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
   // @ViewChild('phone') phone!:ElementRef ;   
  thisLang:any;

  // phone_num!:any ;
  landing!: FormGroup;

    constructor(private router:Router , private route:ActivatedRoute, private service: AuthService,private activatedRoute: ActivatedRoute,public translate: TranslateService) { 
      this.thisLang = localStorage.getItem('currentLang');
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        // if (event.lang == 'ar') {
        //   this.thisLang = 'rtl';
        // } else if(event.lang == 'en') {
        //   this.thisLang = 'ltr';
  
        // }
        
      });
    }

  ngOnInit(): void {
   
    this.landing = new FormGroup({
   
      phone: new FormControl(null, [Validators.required, Validators.minLength(9)]),
    })
  }
  
  back() {
    this.router.navigate(['/']);
  }
  
  submit() {
    console.log("phone" ,this.landing.value.phone)
      this.service.sendSms(this.landing.controls.phone.value).subscribe((res:any) => {
       console.log("landing response", res) ;
            // this.phone_num =this.phone.nativeElement.value ;
        // localStorage.setItem("phone",this.landing.controls.phone.value)
        if (res.status==200){
          this.router.navigate(['/reset'],{queryParams : {phone: this.landing.controls.phone.value}});
        }
 
  })
 
  }
}
