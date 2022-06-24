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

  saveTask(data:any):Observable<any> {
    return this.http.post("http://localhost:8080/task/", data); 
  }
  updateTaskById(id:string, data:any): Observable<any> {
    return this.http.patch("http://localhost:8080/task/"+id, data); 
  }
  deleteTaskById(id:string):Observable<any> {
    return this.http.delete("http://localhost:8080/task/"+ id);
  }
}
