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

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.criptKey).toString();
  }

  private decrypt(txtToDecrypt: string): string {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.criptKey).toString(
      CryptoJS.enc.Utf8
    );
  }

  getAuthorizationToken(): string {
    const token = this.decrypt(window.localStorage.getItem('token') || '');
    return token;
  }

  async authUser(user: IUserCredentials): Promise<boolean> {
    const userData = await this.userService.getUserData(user);

    if (userData && typeof userData !== 'string') {
      window.localStorage.setItem('token', this.encrypt(userData.token));
      window.localStorage.setItem('user', this.encrypt(userData.id));
      return true;
    }
    
    return false;
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    }

    return true;
  }
}
