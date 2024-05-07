import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schema } from 'mongoose';

@Injectable({
  providedIn: 'root',
})
export class ExtraService {
  constructor(private readonly httpClient: HttpClient) {}

  get() {
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.get('http://localhost:5000/api/extras/all', {
      headers,
    });
  }

  create(name: string) {
    const body = {
      name,
    };

    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.post(
      'http://localhost:5000/api/extras/create',
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

    return this.httpClient.delete('http://localhost:5000/api/extras/delete', {
      headers,
      body: JSON.stringify(body),
    });
  }
}
