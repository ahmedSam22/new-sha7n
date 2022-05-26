import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'internationalParcel';
  textDir: string = "ltr"
  thisLang:string = localStorage.getItem("currentLang") || navigator.language;

  constructor(public translate:TranslateService){
    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>{
        if(event.lang == "ar"){
          this.textDir = "rtl"
          console.log(this.textDir);
          
        }else{
          this.textDir = "ltr"
          console.log(this.textDir);

        }

    })
  }

}

