import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GlobalService } from '../shared/services/global.service';
  import { GlobalserviceService } from '../../../app/components/globalservice/globalservice.service'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  form!:FormGroup ;
  saudiharbors:any=[];
  fromharbor:any;
  typeofShipping:any;
  typeOfShipment:any; 
  successStatus=false ;
  constructor(private formbuilder:FormBuilder , private globalService:GlobalserviceService , private service:GlobalService) { }

  ngOnInit(): void {

    this.service.getSaudiWarehouses().subscribe((res:any)=>{
      this.saudiharbors = res['data'];
      console.log("saudiharbors",this.saudiharbors)
    }) 

      this.form = this.formbuilder.group({
        // china_harbor_id:['',Validators.required],
        saudi_harbor_id:['',Validators.required],
        // type:['',Validators.required],
        // shipment_type:['',Validators.required],
        weight:['',Validators.required],
        })

 
  }
  onChangeChina(event:any){
      this.fromharbor=event.target.value ;
      console.log("fromharbor",this.fromharbor)
  }
  onTypeOfShipping(event:any){
    this.typeofShipping=event.target.value ;
    console.log(" typeofShipping",this.typeofShipping)
}
onTypeOfShipment(event:any){
    this.typeOfShipment=event.target.value ;
}
  onSubmit(){
    // console.log("REEEEE",this.form.value)
     let postedForm={
          ...this.form.value,
          china_harbor_id: this.fromharbor ,
           type:  this.typeofShipping ,
          shipment_type: this.typeOfShipment,
      }
      console.log("fooooorm",postedForm)
      this.service.homeOrders(postedForm.china_harbor_id,postedForm.saudi_harbor_id, postedForm.type,postedForm.shipment_type,postedForm.weight).subscribe((res:any)=>{
       console.log("REEEEEEEEEEE",res)
       console.log("REEEEEEEEEEE",res.status)
        if(res.status===true){
          this.successStatus=true
        }
        else{
          this.successStatus=false
        }
      })
  }
}
