import { Injectable }                                                       from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LoginYetGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!localStorage.getItem('currentUser')){
            return true;
        }
        this.router.navigate(['/profile'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}