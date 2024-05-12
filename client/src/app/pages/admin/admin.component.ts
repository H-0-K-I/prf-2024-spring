import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Schema } from 'mongoose';
import { HeaderComponent } from '../../components/header/header.component';
import { Vehicle } from '../../../../../shared/models/vehicle.model';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { Extra } from '../../../../../shared/models/extras.model';
import { ExtraService } from '../../services/extra/extra.service';
import { RentalService } from '../../services/rental/rental.service';
import { PopulatedRental } from '../../../../../shared/models/rental.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  vehicles: Array<Vehicle> = [];
  extras: Array<Extra> = [];
  rentals: Array<PopulatedRental> = [];

  constructor(
    private readonly vehicleService: VehicleService,
    private readonly extraService: ExtraService,
    private readonly rentalService: RentalService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getVehicles();
    this.getExtras();
    this.getRentals();
  }

  handleEditVehicleButtonClick = (id: Schema.Types.ObjectId) => {
    this.router.navigateByUrl(`/edit-vehicle/${id}`);
  };

  handleDeleteVehicleButtonClick = (id: Schema.Types.ObjectId) => {
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

  handleDeleteExtraButtonClick = (id: Schema.Types.ObjectId) => {
    this.extraService.delete(id).subscribe({
      next: (data) => {
        if (data) {
          this.getExtras();
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

  private getExtras = () => {
    this.extraService.get().subscribe({
      next: (data) => {
        if (data) {
          this.extras = (data as unknown as { extras: Array<Extra> }).extras;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  private getRentals = () => {
    this.rentalService.get().subscribe({
      next: (data) => {
        if (data) {
          this.rentals = (
            data as unknown as { rentals: Array<PopulatedRental> }
          ).rentals;

          this.rentals.forEach((rental) => {
            const date = new Date(rental.date);
            rental.date = `${date.getFullYear()}/${
              date.getMonth() + 1
            }/${date.getDate()}` as unknown as Date;
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
}
