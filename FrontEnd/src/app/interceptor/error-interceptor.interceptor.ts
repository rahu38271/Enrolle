import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.router.navigate(['errors/error1']);
        } else if (error.status === 500) {
          this.router.navigate(['errors/error2']);
        } else if (error.status === 401) {
          this.router.navigate(['errors/error3']);
        }
        return throwError(error);
      })
    );
  }
}
