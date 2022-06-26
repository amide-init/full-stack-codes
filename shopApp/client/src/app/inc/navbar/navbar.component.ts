import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  appName = "Shalni Shop"
  constructor(private us: UserService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.us.getUser()
      .subscribe(
        (res) => {
          if(res.success) {
            this.user = res.data
          }else{
            this.user = null;
          }
        },
        (err) => {
          this.user = null;
        }
      )
  }

  logout() {
    this.user = null;
    localStorage.clear()
    window.location.replace('/login')
  }

}
