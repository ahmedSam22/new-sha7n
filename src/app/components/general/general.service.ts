import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  fromChinaHarbor:any ;
  toSaudiHarbor:any ; 
  typeOfShipping :any;
  typeOfShipment:any ;
  shipmentWeight :any ;
  height:any ; 
  width:any ;
  length:any;
  order_company_id=1 ;
  logged:any;
  old_order:any;
  new_order:any;
  
  constructor(
    private http: HttpClient
  ) { }



  getAllServicesHome(){
    return this.http.get(`${environment.endpoint}/services`) ;
  }
  getAllShipmentTypes(){
    return this.http.get(`${environment.endpoint}/shipment_types`) ;
  
  }
  getSaudiWarehouses(){
    return this.http.get(`${environment.endpoint}/saudi_harbors`) ;
  
  }

  homeOrders(china_harbor_id:any ,saudi_harbor_id:any , type:any , shipment_type:any , weight:any){
     return this.http.get(`${environment.endpoint}/get-companies?china_harbor_id=${china_harbor_id}&saudi_harbor_id=${saudi_harbor_id}&type=${type}&shipment_type=${shipment_type}&weight=${weight}`) ;
     
   }
   contactUsHome(contact:any){
    return this.http.post(`${environment.endpoint}/contact`,contact) ;
  }
  
  
}
