import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute }               from '@angular/router';
import { AuthService }                          from '../auth.service';
import { User }                                 from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  user: String;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(){
      this.user = this.authService.getUser();
      console.log("we get user: ", this.user);
  }

}
