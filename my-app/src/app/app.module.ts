import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }          from '@angular/forms';
import { HttpClientModule }     from '@angular/common/http';
import { HttpModule }           from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';

import { ElevationPipe }        from './first-pipes';
import { PrefixPipe }           from './prefix-pipe';

import { UserService }          from './user.service';
import { AuthService }          from './auth.service';
import { DataService }          from './data.service';

import { UserDetailComponent }  from './user-detail/user-detail.component';
import { UsersComponent }       from './users/users.component';
import { TableComponent }       from './table/table.component';
import { LoginComponent }       from './login/login.component';
import { SignupComponent }      from './signup/signup.component';
import { ProfileComponent }     from './profile/profile.component';
import { NotFoundComponent }    from './not-found/not-found.component';


import { AuthGuard }            from './guards/auth.guard';  
import { LoginYetGuard }        from './guards/login-yet.guard';      
import { SaveDataGuard }        from './guards/save-data.guard';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UsersComponent,
    ElevationPipe,
    PrefixPipe,
    UserDetailComponent,
    TableComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    AuthGuard,
    LoginYetGuard,
    SaveDataGuard,
    UserService,
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
