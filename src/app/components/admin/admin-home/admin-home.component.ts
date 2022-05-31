import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  toggleLeftTable =true; 
  toggleRightTable = true; 
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:false,
    navSpeed: 400,
    navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
 
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
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
  thisLang:any;

  ngOnInit(): void {
    
  }


  LeftTable() {
    this.toggleLeftTable =!this.toggleLeftTable;
 }
  RightTable() {
   this.toggleRightTable =!this.toggleRightTable ; 
 }
}
