import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message:string  = ''
  messageClass  = 'd-none';
  loginForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private us:UserService
    ) { 
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login() {
    const data = this.loginForm.value;
    this.us.sigIn(data)
        .subscribe(
          (res) => {
            if (res.success) {
              this.message = res.message
              this.messageClass = 'alert alert-success'
              localStorage.setItem('token', res.token);
              setTimeout(() => {
                this.message = ''
                this.messageClass = 'd-none';
                window.location.replace('/');
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
