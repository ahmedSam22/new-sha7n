import { AuthService } from './../auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

// import { GlobalService } from '../shared/services/global.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit {
  // @ViewChild('phone') phone!:ElementRef ;   
  thisLang:any;

  // phone_num!:any ;
  landing!: FormGroup;

    constructor(private router:Router , private route:ActivatedRoute, private service: AuthService,private activatedRoute: ActivatedRoute,public translate: TranslateService) { 
      this.thisLang = localStorage.getItem('currentLang');
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        if (event.lang == 'ar') {
          this.thisLang = 'rtl';
        } else if(event.lang == 'en') {
          this.thisLang = 'ltr';
  
        }
        
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
         this.router.navigate(['/verify-code',this.landing.controls.phone.value]);
        }
 
  })
 
  }
}