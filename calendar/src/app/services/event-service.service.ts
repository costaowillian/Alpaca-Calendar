import { AuthService } from 'src/app/services/auth.service';
import { IEvent } from './../models/event';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { apiUrl } from './helper';

@Injectable({
  providedIn: 'root',
})
// Serviço responsável por lidar com operações relacionadas a eventos
export class EventServiceService {
  constructor(private authService: AuthService) {}

  // Método para obter todos os eventos de um usuário
  async getAllEvents(): Promise<IEvent[]> {
    const userId = this.authService.getAuthorizationToken('user');
    const token = this.authService.getAuthorizationToken('token');

    // Configuração para a requisição HTTP usando Axios
    const axiosConfig = {
      method: 'get',
      url: `${apiUrl}/events/get-all/${userId}`,
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
  async createEvent(params: IEvent): Promise<IEvent | string> {
    const userId = this.authService.getAuthorizationToken('user');
    const token = this.authService.getAuthorizationToken('token');
    console.log('id ' + userId + ' token ' + token);
    // Convertendo os parâmetros do evento para o formato JSON
    const data = JSON.stringify({
      _userId: userId,
      description: params.description,
      start: params.start,
      end: params.end,
    });
    console.log(data);

    // Configuração para a requisição HTTP usando Axios
    const axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${apiUrl}/events/create`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      // Verificando o status da resposta e retorna os dados da resposta em caso de sucesso ou error em caso de data duplicada
      const response = await axios.request(axiosConfig);
      console.log(response);
      if (response.status == 201) {
        return response.data;
      } else {
        // Tratando diferentes códigos de status
        if (response.status == 422) {
          return 'erro 422';
        } else {
          return 'error 422';
        }
      }
    } catch (error) {
      // Capturando erros de rede, timeout, etc.
      if (axios.isAxiosError(error) && error.response) {
        // Se for um erro Axios com resposta, trate o código de status aqui
        if (error.response.status === 422) {
          return 'erro 422';
        } else {
          throw new Error(
            `Erro na solicitação com status ${error.response.status}`
          );
        }
      } else {
        // Tratamento para outros tipos de erros
        throw new Error('Erro ao processar a solicitação');
      }
    }
  }
}
