import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class GlobalserviceService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem(`${environment.currentUserKey}`) || '{}')
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    if (this.currentUserSubject.value != null) {
      return this.currentUserSubject.value;
    }
  }

  personalInfo() {
    return this.http.get(`${environment.endpoint}/users/myaccount`);
  }

  updatePersonalInfo(info: any) {
    return this.http.post(`${environment.endpoint}/users/update-profile`, info);
  }

  gtAllTestmonialsHome() {
    return this.http.get(`${environment.endpoint}/testimonials`);
  }

  checkPromo(code: any) {
    return this.http.get(
      `${environment.endpoint}/orders/check-promo?code=${code}`
    );
  }
  getAllShipmentTypes() {
    return this.http.get(`${environment.endpoint}/shipment_types`);
  }
}
