import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
   id_code!:any;
  logIn!:FormGroup ;
  thisLang:any;
  incomeKSAharbor:any;
  incomeChinaHarbor:any;
  incomeShippingType:any;
  incomeShipmentType:any;
  incomeWeight:any;
  incomeLength:any;
  incomeWidth:any;
  incomeHeight:any;
  saudiharbors: any = [];
  fromharbor: any;
  toharbor: any;
  typeofShipping: any;
  typeOfShipment: any;
  shippingWeight:any;
  shippingLength:any;
  shippingWidth:any;
  shippingHeight:any;
  case:any;
  showConfirm:boolean = false;
  constructor(private router:Router ,private _location: Location , public service: AuthService,private activatedRoute: ActivatedRoute,public translate: TranslateService) { 
    this.activatedRoute.queryParams.subscribe((params) => {
      this.case = params['case'];
      this.incomeKSAharbor = params['saudiHarbor'];
      this.incomeChinaHarbor = params['chinaHarbor'];
      this.incomeShippingType = params['shippingType'];
      this.incomeShipmentType = params['shipmentType'];
      this.incomeWeight = params['weight'];
      this.incomeLength = params['length'];
      this.incomeWidth = params['width'];
      this.incomeHeight = params['height'];

    });
    
    console.log(localStorage.getItem("qadiautkCurrentUser") , "hhh");
    
    if(localStorage.getItem("qadiautkCurrentUser")){
      this.router.navigate(['/home']);
    }

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
    this.logIn = new FormGroup({
    'phone' : new FormControl(null ,Validators.required ),
    'password': new FormControl(null , Validators.required)
    });

    this.activatedRoute.paramMap.subscribe(params => {
        this.id_code = params.get('id');
      console.log("check",this.id_code)
     
    });
  }

  back(){
    this.router.navigate(['/home']);

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
            this.router.navigate(['admin/shipping'],{queryParams : {case: 1,saudiHarbor : this.incomeKSAharbor,chinaHarbor:this.incomeChinaHarbor,shippingType : this.incomeShippingType,shipmentType : this.incomeShipmentType,weight : this.incomeWeight,length :this.incomeLength,width :this.incomeWidth , height :this.incomeHeight }}).then(()=>window.location.reload());
            location.reload()
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
