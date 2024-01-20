import { environment } from 'src/environment/environment';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  criptKey: string = environment.apiKey;
  constructor() {}

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.criptKey).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.criptKey).toString(
      CryptoJS.enc.Utf8
    );
  }
}
