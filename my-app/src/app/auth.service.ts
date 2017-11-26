import { Injectable }                              from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Router }                                  from '@angular/router';
import { HttpClient, HttpHeaders }                 from '@angular/common/http';
import { HttpClientModule }                        from '@angular/common/http';
import { HttpModule }                              from '@angular/http';
import { catchError, map, tap }                    from 'rxjs/operators';
import { User }                                    from './user';
import { of }                                      from 'rxjs/observable/of';
import { Subject }                                 from 'rxjs/Subject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  private baseURL = "http://localhost:3000/users";
  token: string;
  private userSource = new Subject<User>();
  user$ = this.userSource.asObservable();

  isLoggedIn: boolean;
  private currentUser;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  setUser(user: User): void {
    this.userSource.next(user);
  }

  getUser(): String{
    let user = localStorage.getItem("currentUser");
    user = JSON.parse(user);
    console.log("get User", user);
    return user;
  }

  logout(): void {
    console.log('logging out');
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  registerUser(user: User): Observable<boolean> {
    let body = JSON.stringify(user);
    return this.http.post(`${this.baseURL}/register`, user, httpOptions)
      .map((res) => this.setToken(res));
  }

  loginUser(user): Observable<Object> {
    let body = JSON.stringify(user);
    return this.http.post(`${this.baseURL}/login`, body, httpOptions)
      .map((content) => this.setToken(content));
  }

  verify(): Observable<Object> {
    let currUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = (currUser && 'token' in currUser) ? currUser.token : this.token;
    let httpOptionsVerify = {
      headers: new HttpHeaders({ 'x-access-token': token })
    };
    return this.http.get(`${this.baseURL}/checkstate`, httpOptions);
  }

  setToken(res) {
    let userInfo = res.user;
    if (res['success'] == true) {
      this.token = res.token;
      localStorage.setItem('currentUser', JSON.stringify({
        username:   userInfo.username,
        email:      userInfo.email,
        school:     userInfo.school,
        university: userInfo.university,
        gender:     userInfo.gender,
        birthDate:  userInfo.birthDate,
        city:       userInfo.city,
        country:    userInfo.country,
        token:      this.token
      }));
    }
    return res;
  }
}
