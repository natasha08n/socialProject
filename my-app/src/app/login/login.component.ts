import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { User }                                 from '../user';               
import { AuthService }                          from '../auth.service';
import { Router, ActivatedRoute }               from '@angular/router';
import { ProfileComponent }                     from '../profile/profile.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: any = {};
  users: User[];
  loading = false;
  returnUrl: string;

  //new
  message: String;
  user_status: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.user = new User;
  }

  ngOnInit() {
    
  }


  loginUser(user){
    this.loading = true;
    this.authService.loginUser(user).subscribe( content => {
      this.user_status = content['success']; 
      console.log("res",content);
      if(content['success'] === true) {
        console.log("try to navigate");
        this.router.navigateByUrl('/profile');
        this.authService.setUser(user);
      } else {
        this.message = content['message'];
      }
    });
  }
}
