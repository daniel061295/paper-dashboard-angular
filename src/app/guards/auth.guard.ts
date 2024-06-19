import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SignInService } from 'app/pages/login-page/services/login-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private signInService : SignInService){ };
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const router = inject(Router);
    if(this.signInService.isAuth()){
      
      return true;
    }else{
      const urlTreeReturn = router.createUrlTree(["/login"]);
      return false;
    }
  }
  
}
