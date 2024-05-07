import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../../../shared/models/vehicle.model';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { Schema } from 'mongoose';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  vehicles: Array<Vehicle> = [];

  constructor(
    private readonly vehicleService: VehicleService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getVehicles();
  }

  handleEditButtonClick = (id: Schema.Types.ObjectId) => {
    this.router.navigateByUrl(`/edit-vehicle/${id}`);
  };

  handleDeleteButtonClick = (id: Schema.Types.ObjectId) => {
    this.vehicleService.delete(id).subscribe({
      next: (data) => {
        if (data) {
          this.getVehicles();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  private getVehicles = () =>
    this.vehicleService.get().subscribe({
      next: (data) => {
        if (data) {
          this.vehicles = (
            data as unknown as { vehicles: Array<Vehicle> }
          ).vehicles;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
}
