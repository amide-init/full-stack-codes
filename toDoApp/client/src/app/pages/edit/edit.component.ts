import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  message:string  = ''
  messageClass  = 'd-none';
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ts: TaskService,
    private activatedRoute:ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getTaskById(id);

  }
  getTaskById(id:string) {
    this.ts.getTaskById(id)
        .subscribe(
          (res) => {
            if(res.success) {
              this.taskForm.get('title').setValue(res.data.title)
              this.taskForm.get('description').setValue(res.data.description)
            }
          }
        )
  }

  updateTask() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const data = {
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value
    }

    this.ts.updateTaskById(id, data)
      .subscribe(
        (res) => {
          if (res.success) {
            this.message = res.message
            this.messageClass = 'alert alert-success'
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
