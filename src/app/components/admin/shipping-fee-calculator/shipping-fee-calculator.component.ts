import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/services/global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
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
  fullComercialInvoice=false ;
  fullPackingList=false;

 
  thisLang:any;

  constructor( private service:GlobalService ,private formbuilder:FormBuilder ,private router:Router,public translate: TranslateService) { 


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
      weight1:[{value:this.shipmentWeight,disabled:true},Validators.required],
      length:[this.length,Validators.required],
      width:[this.width,Validators.required],
      height:[this.height,Validators.required] ,
        })
        // this.form.get('weight')?.disable()  
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
  this.commercialInvoice=event.target.files;
  console.log("files" , this.commercialInvoice[0]);
  if(this.commercialInvoice.length!=0){
    this.showComercialInvoice=false;
    this.fullComercialInvoice=true ;
   
  }
   else {
    this.showComercialInvoice=true;
    this.fullComercialInvoice=false ;
 }
}

packingListChange(event:any){
  this.packingList=event.target.files
  console.log("files" , this.packingList[0] );
  if(this.packingList.length!=0){
    this.showPackingList=false
    this.fullPackingList=true;
  }
   else {
    this.showPackingList=true;
    this.fullPackingList=false;
 }
}
resetForm() {
  Object.keys(this.form.controls).forEach((key) => {
    this.form.controls[key].clearValidators();
  });

  this.form.reset();
  
  Object.keys(this.form.controls).forEach((key) => {
    this.form.controls[key].setValidators([
      Validators.required,
    ]);
  });

}

newOrder(){
  setTimeout(() =>{
    this.router.navigate(['/orders']);
     },1500);
    //  this.service.logged=2;
     console.log("navigated")
}
 
onSubmit(){
  if(this.packingList.length!=0 &&this.commercialInvoice.length!=0){  
  let orderId:number;
  let payed:number;
  let subForm = {
    ...this.form.value,
    weight:this.shipmentWeight,
    company_id: this.service.order_company_id,
    invoice: this.commercialInvoice[0],
    list:this.packingList[0]  ,
    code:''
  }

  console.log("hello " , subForm)
  this.service.bookingOrder(subForm).subscribe((res:any)=>{
    Swal.fire(
  
      
        res.message
        )
        orderId = res.data.id
        payed = res.data.payed
   console.log("res",res)
   this.form.reset();
   this.orderPayment(orderId,payed)
  } ,
  (error:any)=>{
    console.log(error)
  })
}
else {
  Swal.fire(
   "Files Are Required"
    )
}
}
 
orderPayment(orderId:any,payed:number){
  return this.service.orderPayment(orderId,payed).subscribe((e:any)=>{
  
window.open(`${e.url}`)
      console.log(e.url);
      
  })
}
}