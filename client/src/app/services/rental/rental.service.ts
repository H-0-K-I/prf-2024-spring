import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schema } from 'mongoose';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(private readonly httpClient: HttpClient) {}

  get() {
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.get('http://localhost:5000/api/rentals/all', {
      headers,
    });
  }

  getByUsername(username: string) {
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.get(
      `http://localhost:5000/api/rentals/${username}`,
      {
        headers,
      }
    );
  }

  create(
    vehicleId: Schema.Types.ObjectId,
    username: string,
    date: Date,
    extras: Array<Schema.Types.ObjectId>
  ) {
    const body = {
      vehicleId,
      username,
      date,
      extras,
    };

    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.post(
      'http://localhost:5000/api/rentals/create',
      JSON.stringify(body),
      {
        headers,
      }
    );
  }

  delete(id: Schema.Types.ObjectId) {
    const body = {
      id,
    };

    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.delete('http://localhost:5000/api/rentals/delete', {
      headers,
      body: JSON.stringify(body),
    });
  }
}
