import { SecureStorageService } from './../service/secure-storage.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthsGuard implements CanLoad {
   constructor(private authService: AuthService, private router: Router,
    private secureStorageService :SecureStorageService){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {




      if(this.authService.isLoggedIn) {
        return true
      }else {
   this.router.navigateByUrl('/login')
        return false;
      }

  }
}
