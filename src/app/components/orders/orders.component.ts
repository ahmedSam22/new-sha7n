import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
import { GlobalService } from '../shared/services/global.service';
  import { GlobalserviceService } from '../../../app/components/globalservice/globalservice.service'
  import { Router } from '@angular/router';
 
import { ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
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
  thisLang:any;
  constructor(private router:Router ,private formbuilder:FormBuilder , private globalService:GlobalserviceService , private service:GlobalService ,     public translate: TranslateService
    ) {
      this.thisLang = localStorage.getItem('currentLang');
      console.log(this.thisLang, 'from ocnst');
  
      translate.setDefaultLang(this.thisLang);
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
  }
  onChangeSaudi(event:any){
    this.toharbor=event.target.value ;
   // console.log("toharbor",this.toharbor)
    this.service.toSaudiHarbor=this.toharbor;
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
}
onTypeOfShipment(event:any){
    this.typeOfShipment=event.target.value ;
   // console.log("typeOfShipment",this.typeOfShipment)
    this.service.typeOfShipment=this.typeOfShipment
}
getWeight(){
  this.service.shipmentWeight=this.shippingWeight.nativeElement.value
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
    console.log("HHHHHHHHHHHHHH")
    console.log("fromChinaHarbor",this.service.fromChinaHarbor )
    console.log("toSaudiHarbor", this.service.toSaudiHarbor)
    console.log("typeOfShipping",this.service.typeOfShipping)
    console.log("typeOfShipment",this.service.typeOfShipment)
    console.log("shipmentWeight",this.service.shipmentWeight )
    console.log("height", this.service.height)
    console.log("width ", this.service.width)
    console.log("length ", this.service.length )
    console.log("HHHHHHHHHHHHHH")
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
          this.successStatus=true;
          this.successImage=false;
          // this.info=res['data'];
          // console.log("infoooooooooooooo",this.info)
          // this.costs=this.info;
          // for(let i=0; i<this.info.length ; i++){
          //   this.service.order_company_id= this.info[0].id
          //   this.logo=this.info[0].imagePath
          // }
          this.costs=res.price
          this.logo=res.data.imagePath
          console.log("company idddddddd" , this.service.order_company_id)
        
         this.btnStyle = document.getElementById('btnCalculating');
         this.btnStyle.style.display = 'none';
         }
        else{
          console.log("errorrrrrr", res.errors)
          this.successStatus=false;
          this.successImage=true;
          for(let i=0 ; i<res.errors.length;i++){
            this.errorMessages=res.errors[0]
            
           }
           Swal.fire(
            "Fail" ,
            this.errorMessages
           )
        }
      })
  }

  goadmindashboard(){
    setTimeout(() =>{
      this.router.navigate(['root/login',this.val]);
       },1500);
       console.log("navigated")
  }


  
}
