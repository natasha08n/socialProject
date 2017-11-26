import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  users: User[];

  constructor(private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //this.getUser();
    //this.getUserFriends();
  }

  // getUser(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   console.log('for id=', id);
  //   this.userService.getUser(id)
  //     .subscribe(user => {
  //       this.user = user;
  //     });
  // }

  // getUserFriends():void{
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   console.log('for id=', id);
  //   this.userService.getFriends(id)
  //     .subscribe(users => {
  //       this.users = users;
  //       console.log('got users', users);
  //     });
  // }

}
