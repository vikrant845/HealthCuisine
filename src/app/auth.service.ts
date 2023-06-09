import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/models/userModel';
import { AES, enc } from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user!: UserModel;
  ROOT_URL = `${ environment.ROOT_URL }/users`;
  isLoggedIn = false;
  
  constructor(private http: HttpClient) { }

  login (username: string, password: string) {
    return this.http.post<any>(`${ this.ROOT_URL }/login`, { username, password });
  }

  signup (user: any) {
    return this.http.post<any>(`${ this.ROOT_URL }/signup`, { ...user })
  }

  validUser() {
    return this.http.post(`${ this.ROOT_URL }/verify`, { token: localStorage.getItem('jwt') });
  }

  logout() {
    return this.http.get(`${ this.ROOT_URL }/logout`);
  }

  setUser (user: UserModel) {
    const userEncrypted = AES.encrypt(JSON.stringify(user), environment.crypto_secret).toString();
    localStorage.setItem('user', userEncrypted);
  }

  getUser () {
    let decryptedUser = localStorage.getItem('user');
    if (decryptedUser) {
      decryptedUser = AES.decrypt(decryptedUser, environment.crypto_secret).toString(enc.Utf8);
      return JSON.parse(decryptedUser);
    }
    return false;
  }

  deleteUser () {
    localStorage.clear();
  }

}