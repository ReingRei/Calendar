import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private get url() {
    // return `${environment.baseUrl}/autenticacao`;
  }

  private get _storage(): Storage {
    return this.isStored ? localStorage : sessionStorage;
  }

  static get TOKEN_USUARIO(): string {
    return 'TOKEN_USUARIO';
  }

  get isStored(): boolean {
    // por padrão, armazena
    if (!localStorage.getItem('is_stored_session')) return true;

    return localStorage.getItem('is_stored_session') === '1';
  }

  set isStored(is_stored_session: boolean) {
    localStorage.clear();
    sessionStorage.clear();

    localStorage.setItem('is_stored_session', is_stored_session ? '1' : '0');
  }

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  getToken(): string | null {
    return this._storage.getItem(AuthService.TOKEN_USUARIO);
  }

  setToken(token: string): void {
    this._storage.setItem(AuthService.TOKEN_USUARIO, token);
  }

  logout(): void {
    this._storage.removeItem(AuthService.TOKEN_USUARIO);
  }
}
