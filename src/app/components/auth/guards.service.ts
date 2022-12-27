import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



class UserToken {}
class Permissions {
  canActivate(): boolean {
    return true;
  }
}

@Injectable()
export class GuardsService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   if (localStorage.getItem(`${environment.currentUserKey}`)) {
   return true;
    }

    this.router.navigate(['/login/1'], { queryParams: { returnUrl: state.url } });
    return false;
 }


}
