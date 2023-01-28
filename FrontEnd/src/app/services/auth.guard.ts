import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService } from 'src/app/services/authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  Username: string;
  Password: string;
 
  constructor(private router:Router,private auth:AuthenticationService){

  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
  //     if(this.router.url === '/'){
  //       this.router.navigate(['/']);
  //       return false;
  //     }
  //     return true;
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
      const isLoggedIn = this.auth.loginUser(this.Username, this.Password);
      if(!isLoggedIn){
        return true;
      }
      return this.router.navigate(['/'])
  }
  
}


