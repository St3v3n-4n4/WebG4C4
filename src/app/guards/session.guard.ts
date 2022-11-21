import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private seguridadService: SeguridadService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.seguridadService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/seguridad/login']);
      return false;
    }
  }

}
