import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get("http://localhost:8080/task/");
  }
  getTaskById(id:string): Observable<any> {
    return this.http.get("http://localhost:8080/task/"+ id);
  }
  updateTaskById(id:string) {

  }
  deleteTaskById(id:string):Observable<any> {
    return this.http.delete("http://localhost:8080/task/"+ id);
  }
}
