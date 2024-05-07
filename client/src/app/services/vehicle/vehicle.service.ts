import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schema } from 'mongoose';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private readonly httpClient: HttpClient) {}

  get() {
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.get('http://localhost:5000/api/vehicles/all', {
      headers,
    });
  }

  create(make: string, model: string, pricePerDay: number) {
    const body = {
      make,
      model,
      pricePerDay,
    };

    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.post(
      'http://localhost:5000/api/vehicles/create',
      JSON.stringify(body),
      {
        headers,
      }
    );
  }

  find(id: Schema.Types.ObjectId) {
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.get(`http://localhost:5000/api/vehicles/${id}`, {
      headers,
    });
  }

  update(
    id: Schema.Types.ObjectId,
    make: string,
    model: string,
    pricePerDay: number
  ) {
    const body = {
      id,
      make,
      model,
      pricePerDay,
    };

    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.put(
      'http://localhost:5000/api/vehicles/update',
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

    return this.httpClient.delete('http://localhost:5000/api/vehicles/delete', {
      headers,
      body: JSON.stringify(body),
    });
  }
}
