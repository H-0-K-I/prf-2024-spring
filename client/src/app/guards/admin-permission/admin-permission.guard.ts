import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AdminPermissionsService } from '../../services/admin-permission/admin-permission.service';

export const AdminPermissionGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(AdminPermissionsService).canActivate(next, state);
};
