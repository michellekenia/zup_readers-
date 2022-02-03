import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CrudServiceService } from './crud-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: {email: string, password: string} | null = null;
  localStorageKey = 'auth';

  constructor(
    private crudService: CrudServiceService,
    private route: Router) { }

  login(loginData: {email: string, password: string}) {
    this.crudService.post('https://viacep.com.br/ws/01001000/json/', loginData).subscribe((res: any) => {
      if (res) {
        if (!localStorage.getItem(this.localStorageKey)) {
          localStorage.setItem(this.localStorageKey, JSON.stringify(res))
        }
        this.user = res;
        this.route.navigate(['feed'])
      }
    },
    err => {
      console.log(err)
      alert(err.message)
    })
  }

  isLogged() {
    return !!localStorage.getItem(this.localStorageKey);
  }

  getUser() {
    return this.user;
  }
}
