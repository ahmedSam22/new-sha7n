import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService {

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
getAllShipmentTypes(){
  return this.http.get(`${environment.endpoint}/shipment_types`) ;

}
 checkPromo(code:any){
  return this.http.get(`${environment.endpoint}/orders/check-promo?code=${code}`) ;

 }
}
