import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeAdminComponent implements OnInit {
  
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
  constructor() { }

  ngOnInit(): void {
    
  }


  LeftTable() {
    this.toggleLeftTable =!this.toggleLeftTable;
 }
  RightTable() {
   this.toggleRightTable =!this.toggleRightTable ; 
 }
  ///////////////////////////////////////////
   
  ////////////////////////////////////////////////

  openwhatsapp(){
    window.open(` https://wa.me/+966582402953`)
  }
}

 
