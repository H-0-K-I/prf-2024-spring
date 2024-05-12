import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { localStorageGetter } from '../../utils/localstorage/localstorage-getter';
import { LSKeys } from '../../utils/localstorage/localstorage-keys';
import { PopulatedRental } from '../../../../../shared/models/rental.model';
import { RentalService } from '../../services/rental/rental.service';
import { Schema } from 'mongoose';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  firstName: string | null = null;
  lastName: string | null = null;
  username: string | null = null;
  email: string | null = null;
  rentals: PopulatedRental[] = [];

  constructor(private readonly rentalService: RentalService) {}

  ngOnInit(): void {
    this.firstName = localStorageGetter(LSKeys.FIRSTNAME);
    this.lastName = localStorageGetter(LSKeys.LASTNAME);
    this.username = localStorageGetter(LSKeys.USERNAME);
    this.email = localStorageGetter(LSKeys.EMAIL);

    this.getRentals();
  }

  compareDates(rentalDate: Date) {
    return (
      new Date(
        `${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }/${new Date().getDate()}`
      ).getTime() < new Date(rentalDate).getTime()
    );
  }

  deleteRental(id: Schema.Types.ObjectId) {
    this.rentalService.delete(id).subscribe({
      next: (data) => {
        if (data) {
          this.getRentals();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private getRentals = () => {
    this.rentalService.getByUsername(this.username!).subscribe({
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
