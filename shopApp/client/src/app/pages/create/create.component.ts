import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  message:string  = ''
  messageClass  = 'd-none';
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ts: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }
  addTask() {
    const data = {
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value
    }
    this.ts.saveTask(data)
      .subscribe(
        (res) => {
          if (res.success) {
            this.message = res.message
            this.messageClass = 'alert alert-success'
            this.taskForm.reset();
            setTimeout(() => {
              this.message = ''
              this.messageClass = 'd-none';
            }, 3000)
          } else {
            this.message = res.message
            this.messageClass =  'alert alert-danger'
            setTimeout(() => {
              this.message = '';
              this.messageClass = 'd-none';
            }, 3000)
          }
         
        },
        (err) => {
          alert("Server Error Try Again")
        }
      );
  }

}
