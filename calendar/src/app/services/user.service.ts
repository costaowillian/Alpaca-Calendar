import { IUser, IUserCredentials } from './../models/user';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { apiUrl } from './helper';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private authService: AuthService) {}

  async getUserData(user: IUserCredentials): Promise<IUser> {
    // Convertendo os parâmetros do usuário para o formato JSON
    const data = JSON.stringify({
      email: user.email,
      password: user.senha,
    });

    // Configuração para a requisição HTTP usando Axios
    const axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${apiUrl}/users/auth`,
      headers: {
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
      } else {
        throw new Error('Erro ao criar evento');
      }
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }
}
