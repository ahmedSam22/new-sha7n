import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { GlobalserviceService } from '../globalservice/globalservice.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../shared/services/global.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //singupval=0;
   id_code!:any;
  logIn!:FormGroup ;
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
    this.logIn = new FormGroup({
    'email' : new FormControl(null ,Validators.required ),
    'password': new FormControl(null , Validators.required)
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
    console.log(this.logIn.value)
    this.service.logIn({...this.logIn.value}).subscribe(res => {
      console.log("log response") ;
      console.log(res) ;
        // Swal.fire(
        //     res.message
        //         )
       console.log("success") ;
        
         if(this.id_code==1){
          setTimeout(() =>{
            this.router.navigate(['admin/adminHome']);
             },2000);
             this.service.new_order=this.id_code;
             console.log("LOG IN New Order ID = " ,this.service.new_order)
         }
         else{
          setTimeout(() =>{
            this.router.navigate(['admin/shipping']);
             },2000);
             this.service.old_order=this.id_code;
             console.log("LOG IN Old Order ID = " ,this.service.old_order)
         }

         
       },
       error => {
        // console.log(error);
         console.log(error.error.errors[0]);

        Swal.fire(
          error.error.errors[0]
            )
       }
       );
      
  }
}
