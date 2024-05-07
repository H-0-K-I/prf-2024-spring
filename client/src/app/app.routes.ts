import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { HomeComponent } from './pages/home/home.component';
import { PermissionGuard } from './guards/permission/permission.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminPermissionGuard } from './guards/admin-permission/admin-permission.guard';
import { AddVehicleComponent } from './pages/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './pages/edit-vehicle/edit-vehicle.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [PermissionGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [PermissionGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [PermissionGuard, AdminPermissionGuard],
  },
  {
    path: 'add-vehicle',
    component: AddVehicleComponent,
    canActivate: [PermissionGuard, AdminPermissionGuard],
  },
  {
    path: 'edit-vehicle/:id',
    component: EditVehicleComponent,
    canActivate: [PermissionGuard, AdminPermissionGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
