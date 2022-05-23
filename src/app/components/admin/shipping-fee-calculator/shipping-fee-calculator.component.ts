import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/services/global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';
@Component({
  selector: 'app-shipping-fee-calculator',
  templateUrl: './shipping-fee-calculator.component.html',
  styleUrls: ['./shipping-fee-calculator.component.css']
})
export class ShippingFeeCalculatorComponent implements OnInit {
 
  ChinaCities =[{id:1,name:'HongKong'},{id:2,name:'Shanghai'} ]
  SaudiCities =[{id:1,name:'Jeddah'},{id:1,name:'Riyadh'}]
  fromCities:any =[]
  toCities:any =[]

  saudiharbors:any=[];
  form!:FormGroup ;
  commercialInvoice: File[] = [];
  packingList: File[] = [];
  commercialInvoiceArr!:any[];
  packingListArr!:any[];
  fromChinaHarbor!:any;
  toSaudiHarbor!:any;
  typeOfShipping!:any;
  typeOfShipment!:any;
  shipmentWeight!:any;
  height!:any;
  width!:any;
  length!:any;
  showCBM=false ;
  showKg=true ;
  showComercialInvoice=true ;
  showPackingList=true;
  constructor( private service:GlobalService ,private formbuilder:FormBuilder ,) { }

  ngOnInit(): void {
    this.fromChinaHarbor=this.service.fromChinaHarbor;
    this.toSaudiHarbor=this.service.toSaudiHarbor;
    this.typeOfShipping=this.service.typeOfShipping;
    this.typeOfShipment=this.service.typeOfShipment;
    this.shipmentWeight=this.service.shipmentWeight;
    this.height=this.service.height;
    this.width=this.service.width;
    this.length= this.service.length ;
    console.log("fromChinaHarbor",this.fromChinaHarbor)

    if(this.typeOfShipping==0){
      this.showCBM=true ;
      this.showKg=false ;
    }
    else{
      this.showCBM=false ;
      this.showKg=true ;
    }
    this.service.getSaudiWarehouses().subscribe((res:any)=>{
      this.saudiharbors = res['data'];
      console.log("saudiharbors",this.saudiharbors)
    }) 
    this.form = this.formbuilder.group({
      china_harbor_id:[this.fromChinaHarbor,Validators.required],
      saudi_harbor_id:[this.toSaudiHarbor,Validators.required],
      type:[this.typeOfShipping,Validators.required],
      shipment_type:[this.typeOfShipment,Validators.required],
      weight:[this.shipmentWeight,Validators.required],
      length:[this.length,Validators.required],
      width:[this.width,Validators.required],
      height:[this.height,Validators.required] ,
      
      })
     
  }
  onChangeChina(event:any){ }
  onTypeOfShipping(event:any){}
  onTypeOfShipment(event:any) {} 
  GetCity(e: any,place: any){
   if(place == 'from' ){
    if(e.target.value == 'China'){
      this.fromCities = this.ChinaCities
    }
    else if (e.target.value == 'Saudi'){
      this.fromCities = this.SaudiCities

    }
    else{
      this.fromCities = []
    }
   }
   else{
    if(e.target.value == 'China'){
      this.toCities = this.ChinaCities
    }
    else if (e.target.value == 'Saudi'){
      this.toCities = this.SaudiCities

    }
    else{
      this.toCities = []
    }
   }
}

commercialInvoiceChange(event:any) {
  this.commercialInvoice.push(event.target.files);
  //this.commercialInvoice=event.target.files;
 // this.commercialInvoiceArr.push(this.commercialInvoice)
  console.log("files" , this.commercialInvoice);
  if(this.commercialInvoiceArr.length!=0){
    this.showComercialInvoice=false
  }
   else {
    this.showComercialInvoice=true
 }
}

packingListChange(event:any){
  this.packingList=event.target.files
  this.packingListArr.push(this.packingList)
  console.log("files" ,typeof(this.packingListArr));
  if(this.packingList.length!=0){
    this.showPackingList=false
  }
   else {
    this.showPackingList=true
 }
}
onSubmit(){
  this.service.bookingOrder(this.form.value).subscribe((res:any)=>{
   console.log(res)
  })
}
}
