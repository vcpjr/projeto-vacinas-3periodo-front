import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../model/dto/usuario.DTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'http://localhost:8080/projeto-vacinas-3periodo/rest/login';

  constructor(private httpClient: HttpClient) {

  }

  autenticar(dto: UsuarioDTO): Observable<any> {
    return this.httpClient.post(this.API + '/autenticar', dto);
  }

  sair(): void{
    localStorage.removeItem('usuarioAutenticado');
  }

}
