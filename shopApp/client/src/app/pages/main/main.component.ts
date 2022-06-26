import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tasks:any;
  constructor(private ts:TaskService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') == null) {
      window.location.replace('/login')
    }
    this.getAllTask();
  }

  getAllTask() {
    this.ts.getTasks()
        .subscribe(
          (res) => {
            if(res.success) {
              this.tasks  = res.data;
            }else{
              this.tasks = null;
            }
          }, 
          (err) => {
            console.log("error", err);
          }
        )
  }
  deleteTask(id:string) {
    this.ts.deleteTaskById(id)
        .subscribe(
          (res) => {
            if(res.success) {
              this.getAllTask();
            }else{
              alert(res.message)
            }
          }
        )
  }

}
