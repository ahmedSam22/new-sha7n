import { Component, OnInit } from '@angular/core';
import { ConfigurationOptions, CustomCountryModel, TooltipOptionsEnum } from 'intl-input-phone';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() {

   
   }
   selectedCountryCode = 'us';
  countryCodes = ['us', 'eg'];

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
  }
  ngOnInit(): void {
  }

}
