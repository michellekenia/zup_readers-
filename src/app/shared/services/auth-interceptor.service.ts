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
    const token: string | null = localStorage.getItem('auth'); // This retrieves a token from local storage
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', token) });// This clones HttpRequest and Authorization header with Bearer token added
      req = req.clone({ headers: req.headers.set('content-type', 'application/json') });
    }
    // req = req.clone({ headers: req.headers.set('User-agent', 'SomeUserAgent') });
    // req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    console.log(req);

    return next.handle(req)
    .pipe(
       catchError((error: HttpErrorResponse) => {
            // Catching Error Stage
            if (error && error.status === 401) {
                console.log("ERROR 401 UNAUTHORIZED") // in case of an error response the error message is displayed
            }
            const err = error.error.message || error.statusText;
            return throwError(error); // any further errors are returned to frontend                    
       })
    );
  }
}
