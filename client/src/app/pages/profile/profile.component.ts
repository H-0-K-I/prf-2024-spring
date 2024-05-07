import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { localStorageGetter } from '../../utils/localstorage/localstorage-getter';
import { LSKeys } from '../../utils/localstorage/localstorage-keys';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  firstName: string | null = null;
  lastName: string | null = null;
  username: string | null = null;
  email: string | null = null;

  ngOnInit(): void {
    this.firstName = localStorageGetter(LSKeys.FIRSTNAME);
    this.lastName = localStorageGetter(LSKeys.LASTNAME);
    this.username = localStorageGetter(LSKeys.USERNAME);
    this.email = localStorageGetter(LSKeys.EMAIL);
  }

  // TODO fogllások, módosítás
}
