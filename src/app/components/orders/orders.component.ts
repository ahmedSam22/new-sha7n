import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
import { GlobalService } from '../shared/services/global.service';
  import { GlobalserviceService } from '../../../app/components/globalservice/globalservice.service'
  import { Router } from '@angular/router';
 
import { ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  form!:FormGroup ;
  saudiharbors:any=[];
  fromharbor:any;
  toharbor:any;
  typeofShipping:any;
  typeOfShipment:any; 
  successStatus=false ;
  successImage=true;
  costs:any ; 
  logo:any;
  info:any=[]
  @ViewChild('shippingWeight') shippingWeight!:ElementRef;
  @ViewChild('shippingLength') shippingLength!:ElementRef;
  @ViewChild('shippingWidth') shippingWidth!:ElementRef;
  @ViewChild('shippingHeight') shippingHeight!:ElementRef;
  showCBM=false ;
  showKg=true ;
  btnStyle!:any;
  errorMessages:any=[];
  val=0;
  chinaHarborError=false;
  saudiHarborError=false;
  shipmentTypeError=false;
  shippingError=false ;
  weightError=false;
  submit=false;
  thisLang:any;
  closeChoises=false ;
  constructor(private router:Router ,private formbuilder:FormBuilder , private globalService:GlobalserviceService , private service:GlobalService ,     public translate: TranslateService
    ) {
      this.thisLang = localStorage.getItem('currentLang') || navigator.language;
      console.log(this.thisLang, 'from ocnst');
      if (this.thisLang == 'ar') {
        this.thisLang = 'rtl';
        console.log(this.thisLang, 'test1');
      } else {
        this.thisLang = 'ltr';
        console.log(this.thisLang, 'test2');
      }
      translate.use(localStorage.getItem("currentLang") || navigator.language);
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
     // console.log("fromharbor",this.fromharbor)
      this.service.fromChinaHarbor=this.fromharbor;
      this.chinaHarborError=false;
  }
  onChangeSaudi(event:any){
    this.toharbor=event.target.value ;
   // console.log("toharbor",this.toharbor)
    this.service.toSaudiHarbor=this.toharbor;
    this.saudiHarborError=false;
  }
  onTypeOfShipping(event:any){
    this.typeofShipping=event.target.value ;
    //console.log(" typeofShipping",this.typeofShipping)
    this.service.typeOfShipping=this.typeofShipping
  if(this.typeofShipping==0){
    this.showCBM=true ;
    this.showKg=false ;
  }
  else {
    this.showKg=true ;
    this.showCBM=false ;
  }
  this.shippingError=false ;
}
onTypeOfShipment(event:any){
    this.typeOfShipment=event.target.value ;
   // console.log("typeOfShipment",this.typeOfShipment)
    this.service.typeOfShipment=this.typeOfShipment;
    this.shipmentTypeError=false;
}
getWeight(){
  this.service.shipmentWeight=this.shippingWeight.nativeElement.value;
  if(this.service.shipmentWeight!="")
  this.weightError=false; 
  else {
    this.weightError=true; 
  }
}
 
getHeight(){
  this.service.height = this.shippingHeight.nativeElement.value
 // console.log("height", this.service.height)
}
getWidth(){
  this.service.width = this.shippingWidth.nativeElement.value
  // console.log("width ", this.service.width)
}
getLenght(){
  this.service.length = this.shippingLength.nativeElement.value
  // console.log("length ", this.service.length )
}
  onSubmit(){
 //   console.log("HHHHHHHHHHHHHH")
    // console.log("fromChinaHarbor",this.service.fromChinaHarbor )
    // console.log("toSaudiHarbor", this.service.toSaudiHarbor)
    // console.log("typeOfShipping",this.service.typeOfShipping)
    // console.log("typeOfShipment",this.service.typeOfShipment)
    // console.log("shipmentWeight",this.service.shipmentWeight )
    // console.log("height", this.service.height)
    // console.log("width ", this.service.width)
    // console.log("length ", this.service.length )
   // console.log("HHHHHHHHHHHHHH")
    // console.log("REEEEE",this.form.value)
     let postedForm={
          ...this.form.value,
          china_harbor_id: this.fromharbor ,
           type:  this.typeofShipping ,
          shipment_type: this.typeOfShipment,
      }

      // saudiHarborError=true;
      // chinaHarborError=true;
      // shipmentTypeError=true;
      // shippingError=true ;
      // weightError=true; 
        if(postedForm.china_harbor_id==undefined || postedForm.china_harbor_id==""){
            this.chinaHarborError=true;
        }
        else if (postedForm.saudi_harbor_id==undefined || postedForm.saudi_harbor_id==""){
          this.saudiHarborError=true;
        }
        else if (postedForm.type==undefined || postedForm.type=="") {
          this.shippingError=true ;
        }
        else if (postedForm.shipment_type==undefined || postedForm.shipment_type=="") {
           this.shipmentTypeError=true;
        }
        else if (postedForm.weight==undefined || postedForm.weight=="") {
          this.weightError=true; 
        }
        else {
        console.log("kolo tamammmmm")
          this.saudiHarborError=false;
          this.chinaHarborError=false;
          this.shipmentTypeError=false;
          this.shippingError=false ;
          this.weightError=false; 
          this.submit=true;
        }
      console.log("fooooorm",postedForm)
     if(this.submit==true){
    
      this.service.homeOrders(postedForm.china_harbor_id,postedForm.saudi_harbor_id, postedForm.type,postedForm.shipment_type,postedForm.weight).subscribe((res:any)=>{
       console.log("REEEEEEEEEEE",res)
       console.log("REEEEEEEEEEE",res.status)
        if(res.status===true){
          this.successStatus=true;
          this.successImage=false;
        
          this.costs=res.price
          this.logo=res.data.imagePath
          console.log("company idddddddd" , this.service.order_company_id)
        
         this.btnStyle = document.getElementById('btnCalculating');
         this.btnStyle.style.display = 'none';
         this.closeChoises=true;
         this.form.get('weight')?.disable()
         this.form.get('saudi_harbor_id')?.disable()
          
         }
        else{
          console.log("errorrrrrr", res.errors)
          this.successStatus=false;
          this.successImage=true;
          for(let i=0 ; i<res.errors.length;i++){
            this.errorMessages=res.errors[0]
            
           }
          //  Swal.fire(
          //   "Fail" ,
          //   this.errorMessages
          //  )
        }
      })
    }
    // else {
    //   alert("can't submit")
    // }
  }

  goadmindashboard(){
    if(localStorage.getItem("qadiautkCurrentUser")){
      setTimeout(() =>{
        this.router.navigate(['admin/shipping']);
         },1500);
      }
   else {
    // setTimeout(() =>{
    //   this.router.navigate(['login']);
    //    },1500);
    setTimeout(() =>{
      this.router.navigate(['/login',this.val]);
       },1500);
   }
    
       console.log("navigated")
  }


  
}
