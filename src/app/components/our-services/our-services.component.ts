import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
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
   thisLang:any;
  constructor(private service:GlobalService,    public translate: TranslateService
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
