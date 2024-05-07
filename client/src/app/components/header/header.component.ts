import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { localStorageGetter } from '../../utils/localstorage/localstorage-getter';
import { LSKeys } from '../../utils/localstorage/localstorage-keys';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = localStorageGetter(LSKeys.ISADMIN) === 'true';
  }

  handleLogoff() {
    this.authService.logout();
  }
}
