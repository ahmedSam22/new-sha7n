import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { GlobalService } from '../../shared/services/global.service';
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

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver , private service:GlobalService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  
 
  
  ngOnInit(): void {
   
//   this.service.orderByStatusId(this.type).subscribe((res:any)=>{
//     console.log("resssss orderrrrsss ",res );
//     console.log("Typppppe",this.type);
//  }) 
  // this.orderList(this.type)
}
statusOrder(status:any){
  this.service.orderByStatusId(status).subscribe((res:any)=>{
    this.orders=res['data'].data 
    console.log("resssss orderrrrsss",  this.orders );
    console.log("Typppppe",status);
 })  
 
}
getOrders(x:any){
  this.type=x;
  this.statusOrder(this.type)
}
//   onOpenOrder() {
//    this.openOrder=this.openOrder ; //true
//    this.closeOrder=this.closeOrder ; //false
//   }
// onShippingOrder(){}
// onDeliverOrder(){}
 details(){
 this.moreDetails=!this.moreDetails;
}
 
}
