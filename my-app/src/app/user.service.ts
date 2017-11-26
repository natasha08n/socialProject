import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { User } from './user';
import { USERS } from './mock-users';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private usersUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return of(USERS);
  }

  // getUser(id: number): Observable<User>{
  //   let currentUser = USERS.find( (el) => {
  //     return el.id === id;
  //   });
  //   return currentUser;
  // }

  // getFriends(id: number): Observable<User[]>{
  //   let currentUser = USERS.find( (el) => {
  //     return el.id === id;
  //   });

  //   let currentFriendIds = currentUser.friendList;

  //   let equal;

  //   let friends = USERS.filter(function(element){
  //     equal = false;
  //     currentFriendIds.forEach(function(needId){
  //       if (element.id===needId) equal = true;
  //     });

  //     return equal;
  //   });

  //   return of(friends);
  // }

  addUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/createUser`;
    return this.http.post<User>(url, user, httpOptions);
  }

}
