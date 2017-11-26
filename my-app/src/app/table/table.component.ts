import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

   
  @Input()  user: User;
  @Input()  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    
  }

}
