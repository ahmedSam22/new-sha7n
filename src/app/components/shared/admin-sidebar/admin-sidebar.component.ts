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
  element:any;


  constructor(public translate: TranslateService) { 
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

  }

  ngOnInit(): void {
    
  }
  openNav() {
    
  }
  closeNav() {
    this.element = document.getElementById('divId');
    this.element.classList.toggle('show')
    this.element.style.transition='transform ease-out 3s'; 
    this.element.classList.add("collapse");
  }
  doSomeThing(){
   let x= document.getElementById('divId') as HTMLElement;
   x.classList.toggle("show");
  }

  logout(){
    localStorage.removeItem("qadiautkCurrentUser")
  }
}
