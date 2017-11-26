import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent }       from './users/users.component';
import { LoginComponent }       from './login/login.component';
import { SignupComponent }      from './signup/signup.component';
import { UserDetailComponent }  from './user-detail/user-detail.component';
import { NotFoundComponent }    from './not-found/not-found.component';
import { ProfileComponent }     from './profile/profile.component';
import { AuthGuard }            from './guards/auth.guard';
import { LoginYetGuard }        from './guards/login-yet.guard';
import { SaveDataGuard }        from './guards/save-data.guard';


const appRoutes: Routes = [
  { path: 'users',    component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
  { path: 'login',    component: LoginComponent, canActivate: [LoginYetGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginYetGuard], canDeactivate: [SaveDataGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{}
