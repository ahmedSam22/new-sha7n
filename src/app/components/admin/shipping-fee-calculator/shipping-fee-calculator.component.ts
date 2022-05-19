import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping-fee-calculator',
  templateUrl: './shipping-fee-calculator.component.html',
  styleUrls: ['./shipping-fee-calculator.component.css']
})
export class ShippingFeeCalculatorComponent implements OnInit {
  ChinaCities =[{id:1,name:'HongKong'},{id:2,name:'Shanghai'} ]
  SaudiCities =[{id:1,name:'Jeddah'},{id:1,name:'Riyadh'}]
  fromCities:any =[]
  toCities:any =[]

  constructor() { }

  ngOnInit(): void {
  }
  GetCity(e: any,place: any){
   if(place == 'from' ){
    if(e.target.value == 'China'){
      this.fromCities = this.ChinaCities
    }
    else if (e.target.value == 'Saudi'){
      this.fromCities = this.SaudiCities

    }
    else{
      this.fromCities = []
    }
   }
   else{
    if(e.target.value == 'China'){
      this.toCities = this.ChinaCities
    }
    else if (e.target.value == 'Saudi'){
      this.toCities = this.SaudiCities

    }
    else{
      this.toCities = []
    }
   }
}
}
