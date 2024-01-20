import {
  ICreateUserCredentials,
  IUser,
  IUserCredentials,
} from './../models/user';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { apiUrl } from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  async createuser(user: ICreateUserCredentials): Promise<boolean> {
    // Convertendo os parâmetros do usuário para o formato JSON
    const data = JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.senha,
    });

    // Configuração para a requisição HTTP usando Axios
    const axiosConfig = {
      method: 'post',
      url: `${apiUrl}/users/create-user`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      // Verificando o status da resposta e retorna os dados da resposta em caso de sucesso ou error
      const response = await axios.request(axiosConfig);

      //Se retorna HTTP 200 faz a autenticação do usuário no sistema
      if (response.status == 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async getUserData(user: IUserCredentials): Promise<IUser | string> {
    // Convertendo os parâmetros do usuário para o formato JSON
    const data = JSON.stringify({
      email: user.email,
      password: user.senha,
    });

    // Configuração para a requisição HTTP usando Axios
    const axiosConfig = {
      method: 'post',
      url: `${apiUrl}/users/auth`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      // Verificando o status da resposta e retorna os dados da resposta em caso de sucesso ou error em caso
      const response = await axios.request(axiosConfig);

      if (response.status == 200) {
        const user = {
          id: response.data.user.id,
          token: response.data.token,
          firstName: response.data.user.fisrtName,
          lastName: response.data.user.lasName,
          email: response.data.user.email,
        };
        return user;
      } else {
        // Tratando diferentes códigos de status
        if (response.status == 404) {
          return 'erro 404';
        } else {
          return 'error 404';
        }
      }
    } catch (error) {
      // Capturando erros de rede, timeout, etc.
      if (axios.isAxiosError(error) && error.response) {
        // Se for um erro Axios com resposta, trate o código de status aqui
        if (error.response.status === 404) {
          return 'erro 404';
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
