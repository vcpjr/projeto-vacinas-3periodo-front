import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../model/pessoa';

@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  constructor(private httpClient: HttpClient) {

  }

  private readonly API: string = 'http://localhost:8080/projeto-vacinas-3periodo/rest/pessoa';

  public efetuarLogin(pessoa: Pessoa): Observable<Pessoa>{
    return this.httpClient.post<Pessoa>(this.API + '/login', pessoa);
  }

  public salvar(pessoa: Pessoa): Observable<Pessoa>{
    return this.httpClient.post<Pessoa>(this.API, pessoa);
  }

  public atualizar(pessoa: Pessoa): Observable<boolean>{
    return this.httpClient.put<boolean>(this.API, pessoa);
  }

}
