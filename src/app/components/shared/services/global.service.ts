import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
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
  
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router,private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(`${environment.currentUserKey}`)|| '{}' ) );

    this.currentUser = this.currentUserSubject.asObservable();

  }
  public get currentUserValue(): any {
    if(this.currentUserSubject.value != null) { return this.currentUserSubject.value }
  }
singUp(singupUser:any){
//return this.http.post(`${environment.endpoint}/users/register`,singupUser) ;
const formData: FormData = new FormData();
formData.append("name", singupUser.name);
formData.append("email", singupUser.email);
formData.append("phone", singupUser.phone);
formData.append("password", singupUser.password);
formData.append("confirm_password", singupUser.confirm_password);

return this.http.post(`${environment.endpoint}/users/register`,formData)
.pipe( map((user:any) => {
  console.log('registerrrrrr');
  console.log(user);

    if (user && user.data.access_token) {
        localStorage.setItem(`${environment.currentUserKey}`, JSON.stringify(user));
        this.currentUserSubject.next(user);

    } return user;
}));
  }
  logIn(loginUser:any){
  // return this.http.post(`${environment.endpoint}/users/login`,loginUser) ;
    const formData: FormData = new FormData();
    formData.append("email", loginUser.email);
    formData.append("password", loginUser.password);

    return this.http.post(`${environment.endpoint}/users/login`,formData)
    .pipe( map((user:any) => {
      console.log('userrrrrrrr');
      console.log(user);
      console.log(user);
      console.log(user);
        if (user && user.data.access_token) {
            localStorage.setItem(`${environment.currentUserKey}`, JSON.stringify(user));
            this.currentUserSubject.next(user);

        } return user;
    }));
  }
verificationCode(code:any){
  return this.http.post(`${environment.endpoint}/users/active`,code) ;
}
contactUsHome(contact:any){
  return this.http.post(`${environment.endpoint}/contact`,contact) ;
}

personalInfo(){
  return this.http.get(`${environment.endpoint}/users/myaccount`) ;
}

updatePersonalInfo(info:any){
  return this.http.post(`${environment.endpoint}/users/update-profile`,info) ;
}

gtAllTestmonialsHome(){
  return this.http.get(`${environment.endpoint}/testimonials`) ;
}

getAllServicesHome(){
  return this.http.get(`${environment.endpoint}/services`) ;
}
getSaudiWarehouses(){
  return this.http.get(`${environment.endpoint}/saudi_harbors`) ;

}
getChinaWarehouses(){
  return this.http.get(`${environment.endpoint}/china_harbors`) ;

}
getCards(){
  return this.http.get(`${environment.endpoint}/users/cards`) ;

}
deleteCards(card_id: any){
  return this.http.get(`${environment.endpoint}/users/cards/delete?card_id=${card_id}`) ;

}
getCardBrands(){
  return this.http.get(`${environment.endpoint}/backend/brands`) ;

}
getAds(){
  return this.http.get(`${environment.endpoint}/international_companies `) ;

}
getSaudiHarbors(){
  return this.http.get(`${environment.endpoint}/backend/saudi_harbors`) ;
}
homeOrders(china_harbor_id:any ,saudi_harbor_id:any , type:any , shipment_type:any , weight:any){
 // return this.http.get(`${environment.endpoint}/users/cards/delete?card_id=${card_id}`) ;
  return this.http.get(`${environment.endpoint}/get-companies?china_harbor_id=${china_harbor_id}&saudi_harbor_id=${saudi_harbor_id}&type=${type}&shipment_type=${shipment_type}&weight=${weight}`) ;
  
}

bookingOrder(form:any){
  const formData: FormData = new FormData();
formData.append("china_harbor_id", form.china_harbor_id);
formData.append("saudi_harbor_id",form.saudi_harbor_id);
formData.append("type", form.type);
formData.append("shipment_type", form.shipment_type);
formData.append("weight", form.weight);
formData.append("length", form.length);
formData.append("width", form.width);
formData.append("height", form.height);
formData.append("company_id", form.company_id );
formData.append("invoice", form.invoice);
formData.append("list", form.list);
formData.append("code", form.code);
  return this.http.post(`${environment.endpoint}/companies/add-booking`,formData) ;
 }
orderByStatusId(status_id:any){
  // return this.http.get(`${environment.endpoint}/backend/orders?status_id=${status_id}`) ;
  return this.http.get(`${environment.endpoint}/orders?status_id=${status_id}`) ;
}
orderByOrderId(order_id:any){
  return this.http.get(`${environment.endpoint}/backend/orders?order_id=${order_id}`) ;
}
}
