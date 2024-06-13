import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../shared/model/pessoa';
import { Endereco } from '../../shared/model/endereco';

@Component({
  selector: 'app-pessoa-detalhe',
  templateUrl: './pessoa-detalhe.component.html',
  styleUrl: './pessoa-detalhe.component.scss'
})
export class PessoaDetalheComponent implements OnInit{

  public idPessoa: number;
  public pessoa: Pessoa = new Pessoa();


  ngOnInit(): void {

  }

  public compareById(r1: any, r2: any): boolean{
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

}
