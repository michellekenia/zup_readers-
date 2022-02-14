import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token: string | null = localStorage.getItem('auth');
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', token) });
    }

    return next.handle(req)
    .pipe(
       catchError((error: HttpErrorResponse) => {
            // Catching Error Stage
            if (error && error.status === 401) {
            }
            const err = error.error.message || error.statusText;
            return throwError(error);                    
       })
    );
  }
}
