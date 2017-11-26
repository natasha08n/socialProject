import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  users: User[];

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
}
