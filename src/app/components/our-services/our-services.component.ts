import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalserviceService } from '../globalservice/globalservice.service';
import { GlobalService } from '../shared/services/global.service';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {
   services:any;
   textLeft=false ;
   textRight=false ;
  constructor(private service:GlobalService) { }

  ngOnInit(): void {
    this.servicesList();
  }

  servicesList(){
    this.service.getAllServicesHome().pipe(map((res:any)=>res['data'])).subscribe((res:any)=>{
   // this.service.getAllServicesHome().subscribe((res:any)=>{
   console.log(res);
      this.services=res;
      console.log(this.services) ;
    //  for(let i=0;i<this.services.length ; i++) {
    //      if((this.services[i].id)%2===0){
    //        console.log("even");
    //        this.textLeft=true ;
    //       this.textRight=false ;
    //      }
    //      else{
    //        console.log("odd");
    //        this.textLeft=false ;
    //        this.textRight=true ;
    //      }
    //  }
    })
  }
}
