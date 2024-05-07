import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { localStorageSetter } from '../../utils/localstorage/localstorage-setter';
import { User } from '../../../../../shared/models/user.model';
import { LSKeys } from '../../utils/localstorage/localstorage-keys';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin = () => {
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.loginForm.get('username')?.value,
          this.loginForm.get('password')?.value
        )
        .subscribe({
          next: (data) => {
            if (data) {
              localStorageSetter(LSKeys.FIRSTNAME, (data as User).firstName);
              localStorageSetter(LSKeys.LASTNAME, (data as User).lastName);
              localStorageSetter(LSKeys.EMAIL, (data as User).email);
              localStorageSetter(LSKeys.USERNAME, (data as User).username);
              localStorageSetter(LSKeys.ISADMIN, (data as User).isAdmin);
              localStorageSetter(LSKeys.ISLOGGEDIN, true);

              this.router.navigateByUrl('/home');
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      alert('Form is inavlid');
    }
  };
}
