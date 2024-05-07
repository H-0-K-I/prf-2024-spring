import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ExtraService } from '../../services/extra/extra.service';

@Component({
  selector: 'app-add-extra',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HeaderComponent],
  templateUrl: './add-extra.component.html',
  styleUrl: './add-extra.component.scss',
})
export class AddExtraComponent implements OnInit {
  extraForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly extraService: ExtraService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.extraForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  onCreate = () => {
    if (this.extraForm.valid) {
      this.extraService.create(this.extraForm.get('name')?.value).subscribe({
        next: (data) => {
          if (data) {
            this.router.navigateByUrl('/admin');
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
