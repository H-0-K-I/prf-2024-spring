import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.pwMatcher('password', 'confirmPassword'),
      }
    );
  }

  onRegister = () => {
    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.get('firstName')?.value,
          this.registerForm.get('lastName')?.value,
          this.registerForm.get('email')?.value,
          this.registerForm.get('username')?.value,
          this.registerForm.get('password')?.value
        )
        .subscribe({
          next: (data) => {
            if (data) {
              this.router.navigateByUrl('/login');
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

  private pwMatcher = (pw: string, cpw: string) => {
    return (fg: FormGroup) => {
      const control = fg.controls[pw];
      const matchingControl = fg.controls[cpw];

      if (matchingControl.errors && matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      }
    };
  };
}
