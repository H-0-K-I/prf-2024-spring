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
import { RentalService } from '../../services/rental/rental.service';
import { Schema } from 'mongoose';
import { localStorageGetter } from '../../utils/localstorage/localstorage-getter';
import { LSKeys } from '../../utils/localstorage/localstorage-keys';
import { Extra } from '../../../../../shared/models/extras.model';
import { ExtraService } from '../../services/extra/extra.service';

@Component({
  selector: 'app-add-rental',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HeaderComponent],
  templateUrl: './add-rental.component.html',
  styleUrl: './add-rental.component.scss',
})
export class AddRentalComponent implements OnInit {
  rentalForm!: FormGroup;
  availableExtras: Array<Extra> = [];
  selectedExtras: Array<Schema.Types.ObjectId> = [];
  today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly rentalService: RentalService,
    private readonly extraService: ExtraService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.rentalForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      extras: [],
    });

    this.getExtras();
  }

  checkboxChanged(id: Schema.Types.ObjectId) {
    if (this.selectedExtras.includes(id)) {
      const index = this.selectedExtras.indexOf(id);
      if (index > -1) {
        this.selectedExtras.splice(index, 1);
      }
    } else {
      this.selectedExtras.push(id);
    }
  }

  onCreate = () => {
    if (this.rentalForm.valid) {
      this.rentalService
        .create(
          this.route.snapshot.paramMap.get(
            'id'
          ) as unknown as Schema.Types.ObjectId,
          localStorageGetter(LSKeys.USERNAME) as string,
          this.rentalForm.get('date')?.value,
          this.selectedExtras
        )
        .subscribe({
          next: (data) => {
            if (data) {
              this.router.navigateByUrl('/home');
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

  private getExtras = () => {
    this.extraService.get().subscribe({
      next: (data) => {
        if (data) {
          this.availableExtras = (
            data as unknown as { extras: Array<Extra> }
          ).extras;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
}
