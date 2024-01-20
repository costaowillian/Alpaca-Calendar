import { IEvent } from './../models/event';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EventServiceService {
  private apiUrl = 'http://localhost:8000/api/events';

  constructor() {}

  async getAllEvents(userId: string, token: string): Promise<void> {
    const axiosConfig = {
      method: 'get',
      url: `${this.apiUrl}/get-all/${userId}`,
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    };

    axios.request(axiosConfig)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }
}
