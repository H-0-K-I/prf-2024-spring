import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { localStorageGetter } from '../../utils/localstorage/localstorage-getter';
import { LSKeys } from '../../utils/localstorage/localstorage-keys';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  isLoggedIn = localStorageGetter(LSKeys.ISLOGGEDIN);
}
