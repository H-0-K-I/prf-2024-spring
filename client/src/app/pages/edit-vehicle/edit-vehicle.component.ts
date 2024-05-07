import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { Vehicle } from '../../../../../shared/models/vehicle.model';
import { Schema } from 'mongoose';

@Component({
  selector: 'app-edit-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HeaderComponent],
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.scss',
})
export class EditVehicleComponent implements OnInit {
  vehicle!: Vehicle;
  vehicleForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly vehicleService: VehicleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.vehicleService.find(id as unknown as Schema.Types.ObjectId).subscribe({
      next: (data) => {
        if (data) {
          this.vehicle = (data as { vehicle: Vehicle }).vehicle;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.vehicleForm = this.formBuilder.group({
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      pricePerDay: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onEdit = () => {
    if (this.vehicleForm.valid) {
      this.vehicleService
        .update(
          this.vehicle._id,
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
