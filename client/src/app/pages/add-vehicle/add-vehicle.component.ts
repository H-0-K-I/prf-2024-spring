import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { VehicleService } from '../../services/vehicle/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HeaderComponent],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss',
})
export class AddVehicleComponent implements OnInit {
  vehicleForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly vehicleService: VehicleService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.vehicleForm = this.formBuilder.group({
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      pricePerDay: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onCreate = () => {
    if (this.vehicleForm.valid) {
      this.vehicleService
        .create(
          this.vehicleForm.get('make')?.value,
          this.vehicleForm.get('model')?.value,
          this.vehicleForm.get('pricePerDay')?.value
        )
        .subscribe({
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
