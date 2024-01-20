import { IEvent } from './../models/event';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
// Serviço responsável por lidar com operações relacionadas a eventos
export class EventServiceService {
  // URL base da API de eventos
  private apiUrl = 'http://localhost:8000/api/events';
  constructor() {}

  // Método para obter todos os eventos de um usuário
  async getAllEvents(userId: string, token: string): Promise<IEvent[]> {
    const axiosConfig = {
      method: 'get',
      url: `${this.apiUrl}/get-all/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Verificando o status da resposta e retornando os dados da resposta em caso de sucesso
      const response = await axios.request(axiosConfig);

      if (response.status == 200) {
        return response.data;
      } else {
        throw new Error('Erro ao obter eventos');
      }
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }
}
