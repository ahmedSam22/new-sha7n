import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { GlobalService } from '../../shared/services/global.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
// created_at shipping_price
@Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersAdminComponent implements OnInit {
  moreDetails=false ;
  openOrder=true;
  closeOrder=false;
  orders:any=[]
  type!:any;
  typeofshipping:any=[];
  shipType:any;
  moreDetailsArr:any=[];
  list:any;
  selected :any;
  firstSelect:any ;
  orderId:any;
  element:any;
  showmessage=false ;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  thisLang:any;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver , private service:GlobalService,public translate: TranslateService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
      this.thisLang = localStorage.getItem('currentLang');
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        if (event.lang == 'ar') {
          this.thisLang = 'ar';
        } else if(event.lang == 'en') {
          this.thisLang = 'en';
  
        }
        
      });
  }
  
 
  
  ngOnInit(): void {
     this.statusOrder(this.type)
    console.log("resssss orderrrrsss",  this.orders );
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      this.firstSelect=links[11].id
      this.isActive(this.firstSelect);
      this.select(this.firstSelect) 
    }
}
isActive(item:any) {
  return  this.selected === item;
    }
select(item:any) {
    this.selected = item;
   }
statusOrder(status:any){
  this.service.orderByStatusId(status).subscribe((res:any)=>{
    this.orders=res['data'].data ;
   
    for(let i=0;i<this.orders.length;i++){
      
      this.typeofshipping[i]=this.orders[i].type;
       this.orderId=this.orders[i].id ; 
      }
      console.log("SDSADSAD",this.typeofshipping)
      console.log("oooooooo",this.orders)
      if (this.orders.length==0){
        this.showmessage=true ; 
      }
      else {
        this.showmessage=false
      }
      // for (var y=0;y<=this.typeofshipping.length; y++){
      //   if(this.typeofshipping[y]==1) {
      //        this.shipType="Aerial" 
      //        console.log("Aerial 1111" ,this.shipType)
      //    }
      //    else  {
      //        this.shipType="Nautical"
      //        console.log("Nautical 0000", this.shipType)
      //    }
      // }
   })  
    
 
}
 
 
getOrders(x:any){
  this.type=x;
  this.statusOrder(this.type)
  
}
   
 details(id:any){
  let b= document.getElementById("id"+id)as HTMLElement;
  // b.innerText = "less details";
   this.orderId=id
   this.element = document.getElementById(this.orderId)?.classList;
   this.element.toggle("show");

  //b.innerHTML +=""
 
   
   if(this.element.contains("show") ){
     if(this.thisLang === "en"){
       b.innerText = "Less Details"
     }
     if(this.thisLang === "ar"){
      b.innerText = "عرض الأقل"
     }
    
   }
   else {
    if(this.thisLang === "en"){
      b.innerText = "More Details"
    }
    if(this.thisLang === "ar"){
     b.innerText = "عرض المزيد"
    }
   }
}
 
  
 
}
