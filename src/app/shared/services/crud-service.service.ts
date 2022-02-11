import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  constructor(private http: HttpClient) { }

  public get(url: string, ) {
    // loading 
    return this.http.get(url, { withCredentials: true})
    .pipe(catchError((err) => {
      alert(err.error.mensagem? err.error.mensagem: 'Problemas na requisição')
      return of('error ' + err.error.mensagem)
    }));
  }

  public post(url: string, body: object) {
    return this.http.post(url, body)
    .pipe(catchError((err) => {
      alert(err.error.mensagem? err.error.mensagem: 'Problemas na requisição')
      return of('error ' + err.error.mensagem)
    }));
  }
  
  public put(url: string, body: object) {
    return this.http.put(url, body)
      .pipe(catchError((err) => {
        alert(err.error.mensagem? err.error.mensagem: 'Problemas na requisição')
        return of('error ' + err.error.mensagem)
      }));
  }

  public delete(url: string) {
    return this.http.delete(url)
    .pipe(catchError((err) => {
      alert(err.error.mensagem? err.error.mensagem: 'Problemas na requisição')
      return of('error ' + err.error.mensagem)
    }));
  }

}
