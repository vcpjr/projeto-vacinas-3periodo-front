
import { Component, OnInit } from '@angular/core';
import { Estoque } from '../../shared/model/estoque';
import { EstoqueService } from '../../shared/service/estoque.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Unidade } from '../../shared/model/unidade';
import { Vacina } from '../../shared/model/vacina';

@Component({
  selector: 'app-estoque-listagem',
  templateUrl: './estoque-listagem.component.html',
  styleUrl: './estoque-listagem.component.scss'
})
export class EstoqueListagemComponent implements OnInit{

  public estoques : Array<Estoque> = new Array();
  public unidades : Array<Unidade> = new Array();
  public vacinas : Array<Vacina> = new Array();
  public estoque: Estoque | null = null;

  constructor(
    private estoqueService : EstoqueService,
    private router: Router
  ){

  }

  ngOnInit(): void{

    this.consultarTodosEstoques();

  }

  private consultarTodosEstoques(): void{
    this.estoqueService.consultarTodos().subscribe(
      (resultado) => {
        this.estoques = resultado;
      },
      (erro) => {
        Swal.fire('Erro ao consultar a lista de estoques','','error');
      }
    );
  }

  public excluir(estoqueSelecionado: Estoque): void{
    Swal.fire({
      title: 'Sr. gestor(a) da unidade: Deseja realmente excluir o estoque?',
      text: 'Essa ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.estoqueService.excluir(estoqueSelecionado.unidade.id, estoqueSelecionado.vacina.id).subscribe(
          resultado => {
            Swal.fire('Estoque excluído com sucesso!','','success');
            this.estoque = null;
            this.consultarTodosEstoques();
          },
          erro => {
            Swal.fire('Erro!', 'Erro ao excluir o estoque selecionado: ' + erro.error.mensagem, 'error');
          }
        );
      }
    });
  }

  public limpar(){
    this.estoque = null;
    this.consultarTodosEstoques();
  }

  public editar(estoque: Estoque): void{
    this.router.navigate(['/estoque/cadastrar/', estoque.unidade.id, estoque.vacina.id]);
  }

}

