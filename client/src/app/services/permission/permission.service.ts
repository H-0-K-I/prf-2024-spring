import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { localStorageGetter } from '../../utils/localstorage/localstorage-getter';
import { LSKeys } from '../../utils/localstorage/localstorage-keys';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorageGetter(LSKeys.ISLOGGEDIN)) {
      return true;
    } else {
      this.router.navigateByUrl('/unauthorized');
      return false;
    }
  }
}
