import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.css']
})
export class AdminFooterComponent implements OnInit {
  ads:any
  thisLang:any;

  constructor(private service : GlobalService,public translate: TranslateService) { 
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
    this.service.getAds().subscribe((res:any)=>{
    console.log(res.data)
    this.ads = res.data

    }
    )
  }
  selectedCountryCode = 'us';
  countryCodes = ['us', 'eg'];

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
  }

  changeLang(){
    let lang:any;
    if(this.selectedCountryCode === "us"){
        lang = "en"
    }else if(this.selectedCountryCode === "eg"){
       lang = "ar"

    }
    this.translate.use(lang);
    localStorage.setItem("currentLang" , lang);
  }
}
