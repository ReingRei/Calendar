import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ContaService } from '../../conta/conta.service';

@Injectable({
  providedIn: 'root',
})
export class VerificaLoginGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this._authService.getToken() && !localStorage.getItem('usuario-temporario')) {
      return false;
    }
    return true;
  }
}
