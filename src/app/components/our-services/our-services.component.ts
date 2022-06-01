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
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        if (event.lang == 'ar') {
          this.thisLang = 'ar';
        } else if(event.lang == 'en') {
          this.thisLang = 'en';
  
        }
        
      });
    }

  ngOnInit(): void {
    this.servicesList();
  }

  servicesList(){
    this.service.getAllServicesHome().pipe(map((res:any)=>res['data'])).subscribe((res:any)=>{
   console.log(res);
      this.services=res;
      console.log(this.services) ;
      })
  }
}
