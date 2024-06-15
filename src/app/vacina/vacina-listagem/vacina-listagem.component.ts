import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vacina } from '../../shared/model/vacina';
import { VacinaSeletor } from '../../shared/model/seletor/vacina.seletor';
import { VacinaDTO } from '../../shared/model/dto/vacina.DTO';
import { VacinaService } from '../../shared/service/vacina.service';
import Swal from 'sweetalert2';
import { FabricanteService } from '../../shared/service/fabricante.service';
import { Fabricante } from '../../shared/model/fabricante';
import { UnidadeService } from '../../shared/service/unidade.service';
import { Unidade } from '../../shared/model/unidade';
import { EstoqueService } from '../../shared/service/estoque.service';

@Component({
  selector: 'app-vacina-listagem',
  templateUrl: './vacina-listagem.component.html',
  styleUrl: './vacina-listagem.component.scss'
})
export class VacinaListagemComponent implements OnInit{

    public vacinaSeletor: VacinaSeletor = new VacinaSeletor();

    public listaVacinasDTO : Array<VacinaDTO> = new Array();


    constructor(
      private estoqueService : EstoqueService,
      private router: Router
    ){
    }

  ngOnInit(): void {
    this.pesquisarComFiltros();
  }

  public voltar(): void {
    this.router.navigate(['/vacina']);
  }

  public limpar(): void {
    this.vacinaSeletor = new VacinaSeletor();
    this.listaVacinasDTO = new Array();
    this.pesquisarComFiltros();
  }

  public consultarTodos(): void {
    this.vacinaSeletor = new VacinaSeletor();
  }

  public pesquisarComFiltros(): void {
    this.estoqueService.consultarComFiltros(this.vacinaSeletor).subscribe(
      (resultado) => {
        this.listaVacinasDTO = resultado;

      },
      (erro) => {
        Swal.fire('Erro ao consultar a lista de vacinas com o(s) filtro(s) selecionado(s). ','','error');
      }
    );
  }
}





