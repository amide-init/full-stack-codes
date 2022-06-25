import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  message:string  = ''
  messageClass  = 'd-none';
  signupForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private us:UserService
    ) { 
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: [''],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  signup() {
    const data = this.signupForm.value;
    this.us.createAccount(data)
        .subscribe(
          (res) => {
            if (res.success) {
              this.message = res.message
              this.messageClass = 'alert alert-success'
              this.signupForm.reset();
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
          }
        )
  }

}
