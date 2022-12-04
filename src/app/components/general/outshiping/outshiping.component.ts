import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/services/global.service';

@Component({
  selector: 'app-outshiping',
  templateUrl: './outshiping.component.html',
  styleUrls: ['./outshiping.component.css']
})
export class OutshipingComponent implements OnInit {
  thisLang:any;
  constructor(public translate: TranslateService
    ) { 
      this.thisLang = localStorage.getItem('currentLang')  || navigator.language;
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
  }

}
