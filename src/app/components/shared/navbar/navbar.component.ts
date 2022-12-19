import { Component, OnInit } from '@angular/core';
import { translate } from '@angular/localize/src/translate';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurationOptions, CustomCountryModel, TooltipOptionsEnum } from 'intl-input-phone';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed=true;
  selected :any;
  element:any;
  val=1;
  logedIn:Boolean = false;
  currentLang:string;
  constructor(private router:Router,public translate: TranslateService ) {
    if(localStorage.getItem("qadiautkCurrentUser")){
      this.logedIn = true
    }else{
      this.logedIn = false

    }
    this.currentLang = localStorage.getItem("currentLang") || navigator.language;
    if(this.currentLang === "ar"){
      this.selectedCountryCode = 'sa';
    }
    this.translate.use(this.currentLang)
   
   }
   selectedCountryCode:any = 'us';
  countryCodes = ['us', 'sa'];

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
  }
  ngOnInit(): void {
  }
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  select(item:any) {
    this.selected = item;
      this.hideNavBar();
     
  };
  hideNavBar(){
    this.element = document.getElementById('navbarSupportedContent');
    this.element.style.transition='transform ease-out 3s'; 
    this.element.classList.add("collapse");
    
    // this.element.style.height='1px'; 
    // this.element.style.cursor='pointer';
  }
 

  // if(this.selectedCountryCode === "us"){
      
  // }
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
  logout(){
    localStorage.removeItem("qadiautkCurrentUser")
    location.reload()
  }
}
