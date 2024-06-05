import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estoque } from '../model/estoque';
import { VacinaSeletor } from '../model/seletor/vacina.seletor';
import { VacinaDTO } from '../model/dto/vacina.DTO';

@Injectable({
  providedIn: 'root'
})

export class EstoqueService {

  constructor(private httpClient: HttpClient) {

  }

  private readonly API: string = 'http://localhost:8080/projeto-vacinas-3periodo/rest/estoque';

  public consultarTodos(): Observable<Array<Estoque>>{
    return this.httpClient.get<Array<Estoque>>(this.API + '/consultarTodos');
  }

  public excluir(idUnidade: number, idVacina: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(this.API
                                            + '/' + idUnidade + '/' + idVacina);
  }

  public atualizar(estoque: Estoque): Observable<boolean>{
    return this.httpClient.put<boolean>(this.API, estoque);
  }

  public salvar(estoque: Estoque): Observable<Estoque>{
    return this.httpClient.post<Estoque>(this.API, estoque);
  }

  public consultarComFiltros(seletor: VacinaSeletor): Observable<VacinaDTO>{
    return this.httpClient.post<VacinaDTO>(this.API
                                + '/filtro-Vacinas-EstoqueDaUnidade', seletor);
  }

}
