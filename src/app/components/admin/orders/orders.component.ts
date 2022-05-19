import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersAdminComponent implements OnInit {
  moreDetails=false ;
  openOrder=true;
  closeOrder=false;
  orders:any
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

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  

  ngOnInit(): void {
  this.openOrder=this.openOrder ; //true
  this.closeOrder=this.closeOrder ; //false
}
  onOpenOrder() {
   this.openOrder=this.openOrder ; //true
   this.closeOrder=this.closeOrder ; //false
  }
 onCloseOrder() {
  
  this.openOrder=!this.openOrder ;//false
  this.closeOrder=!this.closeOrder ; // true
}
   details(){
 this.moreDetails=!this.moreDetails;
}
// filter(status_id){
// this.service.getOrder(status_id).subscribe(res=>{
//   this.orders = res
// })
// }
}
