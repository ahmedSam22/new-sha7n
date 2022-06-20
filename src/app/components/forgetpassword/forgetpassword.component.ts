import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { GlobalserviceService } from '../globalservice/globalservice.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../shared/services/global.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
 
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  //singupval=0;
  id_code!:any;
  reset!:FormGroup ;
  thisLang:any;

  showConfirm:boolean = false;
  constructor(private router:Router , private route:ActivatedRoute,private _location: Location , private service: GlobalService,private activatedRoute: ActivatedRoute,public translate: TranslateService) { 
    this.thisLang = localStorage.getItem('currentLang') || navigator.language;
    console.log(this.thisLang, 'from ocnst');

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

  ngOnInit(): void {
    this.reset = new FormGroup({
    'phone' : new FormControl(null ,Validators.required ),
   
    });

    this.activatedRoute.paramMap.subscribe(params => {
        this.id_code = params.get('id');
      console.log("ccccccccccccccccccccc",this.id_code)
     
    });
  }

  back(){
    this._location.back();
  }

  onSubmit() {
    console.log(this.reset.value)
    this.service.sendSms({...this.reset.value}).subscribe((res:any) => {
      console.log("log response " , res) ;
      if(res.status == 200){
    this.router.navigate(['verify-code/reset'])

      }else{
        
        Swal.fire(
          res.errors[0]
            )
      }

         
       },
       error => {
        // console.log(error);
         console.log(error.error.errors[0]);

        Swal.fire(
          error.errors[0]
            )
       }
       );
      
  }

  submit(){
  }
}
