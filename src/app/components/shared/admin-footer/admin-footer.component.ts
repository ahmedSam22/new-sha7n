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
  currentLang:any;
  constructor(private service : GlobalService,public translate: TranslateService) { 
     this.currentLang = localStorage.getItem("currentLang") || navigator.language;

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
    if(this.currentLang === "ar"){
      this.selectedCountryCode = 'sa';
    }
  }

  ngOnInit(): void {
    this.service.getAds().subscribe((res:any)=>{
    console.log(res.data)
    this.ads = res.data

    }
    )
  }
  selectedCountryCode = 'us';
  countryCodes = ['us', 'sa'];

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
  }

  changeLang(){
    let lang:any;
    if(this.selectedCountryCode === "us"){
        lang = "en"
    }else if(this.selectedCountryCode === "sa"){
       lang = "ar"

    }
    this.translate.use(lang);
    localStorage.setItem("currentLang" , lang);
  }
}
