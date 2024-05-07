import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { Vehicle } from '../../../../../shared/models/vehicle.model';
import { Extra } from '../../../../../shared/models/extras.model';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { ExtraService } from '../../services/extra/extra.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, HeaderComponent],
})
export class HomeComponent implements OnInit {
  vehicles: Array<Vehicle> = [];
  extras: Array<Extra> = [];

  constructor(
    private readonly vehicleService: VehicleService,
    private readonly extraService: ExtraService
  ) {}

  ngOnInit(): void {
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
  }
}
