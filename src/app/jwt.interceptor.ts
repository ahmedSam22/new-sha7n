import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalserviceService } from './components/globalservice/globalservice.service';
import { environment } from 'src/environments/environment';
import { GlobalService } from './components/shared/services/global.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private autService:GlobalService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.autService.currentUserValue;
        const isLoggedIn = currentUser && currentUser?.data?.access_token;
        const isApiUrl = request.url.startsWith(environment.endpoint);
       console.log("<---------interceptor----->")
        if (isLoggedIn && isApiUrl) {
            console.log(currentUser)
            request = request.clone({
                setHeaders: {
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${currentUser.data.access_token}`
                }
            });
        }
        console.log("req: " , request);
        return next.handle(request);
    }
}
