import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { localStorageSetter } from '../../utils/localstorage/localstorage-setter';
import { User } from '../../../../../shared/models/user.model';

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
    private readonly authService: AuthService
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
              localStorageSetter('firstName', (data as User).firstName);
              localStorageSetter('lastName', (data as User).lastName);
              localStorageSetter('email', (data as User).email);
              localStorageSetter('username', (data as User).username);
              localStorageSetter('isAdmin', (data as User).isAdmin);
              localStorageSetter('isLoggedIn', true);

              // TODO navigate
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
