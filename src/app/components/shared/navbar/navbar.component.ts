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
  constructor(private router:Router,public translate: TranslateService ) {

   
   }
   selectedCountryCode = 'us';
  countryCodes = ['us', 'eg'];

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
 
}
