import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, first, of } from 'rxjs';
import { CrudServiceService } from './crud-service.service';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';

interface UserInterface {
  nome?: string | null, email?: string | null
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<UserInterface> = new BehaviorSubject({});
  localStorageKey = 'auth';

  constructor(
    private crudService: CrudServiceService,
    private http: HttpClient,
    private route: Router) { }

  login(loginData: { email: string, senha: string }) {
    this.http.post(environment.BASE_PATH + 'login', loginData, { observe: 'response' as 'response' })
      .pipe(catchError(function (err) {
        return of()
      }))
      .subscribe({
        next: (resp: any) => {
          const token = resp.headers.get('Authorization');
          if (token) {
            if (!localStorage.getItem(this.localStorageKey)) {
              localStorage.setItem(this.localStorageKey, token)
            }
            this.getUser()
            this.route.navigate(['feed'])
          }
        },
        error: err => {
          console.log(err);
        }
      })
  }

  loggout() {
    localStorage.removeItem(this.localStorageKey);
    this.route.navigate(['login']);
  }

  isLogged() {
    return !!localStorage.getItem(this.localStorageKey);
  }

  getUser(): BehaviorSubject<UserInterface> {
    if (localStorage.getItem(this.localStorageKey)) {
      let decode = jwt_decode(localStorage.getItem(this.localStorageKey)!.replace('Token ', '')) as {sub: string, exp: number, idUsuario: string};
      this.crudService.get(environment.BASE_PATH + 'usuarios/' + decode.idUsuario).subscribe({
        next: (data: any) => {
          this.user.next(data);
        },
        error: err => {
        }
      })
    }    
    return this.user;
  }
}
