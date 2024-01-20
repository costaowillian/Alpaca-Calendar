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
    // Configuração para a requisição HTTP usando Axios
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

  // Método para criar um evento
  async createEvent(params: IEvent, token: string): Promise<IEvent | string> {
    // Convertendo os parâmetros do evento para o formato JSON
    const data = JSON.stringify({
      _userId: params._userId,
      description: params.description,
      start: params.start,
      end: params.end,
    });

    // Configuração para a requisição HTTP usando Axios
    const axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${this.apiUrl}/create`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      // Verificando o status da resposta e retorna os dados da resposta em caso de sucesso ou error em caso de data duplicada
      const response = await axios.request(axiosConfig);
      console.log(response.status, response.data);

      if (response.status == 201) {
        return response.data;
      } else if (response.status == 422) {
        return 'data duplicada';
      } else {
        throw new Error('Erro ao criar evento');
      }
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }
}
