import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Vehicle } from '../../../../../shared/models/vehicle.model';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, HeaderComponent],
})
export class HomeComponent implements OnInit {
  vehicles: Array<Vehicle> = [];

  constructor(private readonly vehicleService: VehicleService) {}

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
  }
}
