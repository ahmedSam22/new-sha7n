import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  showFiller = false;
  collapsed=true;
  thisLang:any;

  constructor(public translate: TranslateService) { 
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
  }
  openNav() {
    //  document.getElementById('mySidebar').style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
  }
  closeNav() {
    // document.getElementById("mySidebar").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";
  }

  logout(){
    localStorage.removeItem("qadiautkCurrentUser")
  }
}
