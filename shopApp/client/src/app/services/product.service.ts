import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<any> {
    return this.http.get('http://localhost:8080/product');
  }
  addProduct(data:any):Observable<any> {
    return this.http.post('http://localhost:8080/product', data);
  }
  editProduct(id:string,data:any): Observable<any> {
    return this.http.patch('http://localhost:8080/product/'+id, data);
  }
  deleteProduct(id:string): Observable<any>{
    return this.http.delete('http://localhost:8080/product/'+id);
  }
}
