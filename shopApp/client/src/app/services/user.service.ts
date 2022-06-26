import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  createAccount(data:any):Observable<any> {
    return this.http.post("http://localhost:8080/user/signup", data);
  }
  sigIn(data:any) :Observable<any>{
    return this.http.post("http://localhost:8080/user/login", data);
  }
  getUser():Observable<any> {
    const headers =  new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token')
    })
    return this.http.get('http://localhost:8080/user/', {headers: headers})
  }
  addOrder(data):Observable<any> {
    return this.http.post("http://localhost:8080/address/save", data);
  }
}
