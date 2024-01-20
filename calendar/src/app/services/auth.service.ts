import { environment } from 'src/environment/environment';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { UserService } from './user.service';
import { IUserCredentials } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  criptKey: string = environment.apiKey;
  constructor(private userService: UserService) {}

  // Método para criptografar texto usando a chave
  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.criptKey).toString();
  }

  // Método para descriptografar texto usando a chave
  private decrypt(txtToDecrypt: string): string {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.criptKey).toString(
      CryptoJS.enc.Utf8
    );
  }

  // Obter token de autorização descriptografado do armazenamento local
  getAuthorizationToken(item: string): string {
    const localItem = this.decrypt(window.localStorage.getItem(item) || '');
    return localItem;
  }

  // Autenticar usuário, armazenar token criptografado e ID do usuário no armazenamento local
  async authUser(user: IUserCredentials): Promise<boolean> {
    const userData = await this.userService.getUserData(user);
    if (userData && typeof userData !== 'string') {
      window.localStorage.setItem('token', this.encrypt(userData.token));
      window.localStorage.setItem('user', this.encrypt(userData.id));
      return true;
    }

    return false;
  }

  // Remover token e ID do usuário do armazenamento local ao fazer logout
  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
  }

  // Verificar se o usuário está autenticado com base na presença do token
  isUserLoggedIn() {
    const token = this.getAuthorizationToken('token');
    if (!token) {
      return false;
    }

    return true;
  }
}
