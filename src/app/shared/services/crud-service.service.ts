import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  constructor(private http: HttpClient) { }

  public get(url: string) {
    // loading 
    return this.http.get(url);
  }

  public post(url: string, body: object) {
    return this.http.post(url, body);
  }
  
  public put(url: string, body: object) {
    return this.http.get(url);
  }

  public delete(url: string) {
    return this.http.get(url);
  }

}
