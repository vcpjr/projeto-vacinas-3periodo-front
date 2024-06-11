import { Component, OnInit } from '@angular/core';
import { Estoque } from '../../shared/model/estoque';
import { EstoqueService } from '../../shared/service/estoque.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estoque-listagem',
  templateUrl: './estoque-listagem.component.html',
  styleUrl: './estoque-listagem.component.scss'
})
export class EstoqueListagemComponent implements OnInit{

  public estoques : Array<Estoque> = new Array();

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
          },
          erro => {
            Swal.fire('Erro!', 'Erro ao excluir o estoque selecionado: ' + erro.error.mensagem, 'error');
          }
        );
      }
    });
  }

  public editar(estoque: Estoque){
    this.router.navigate(['/estoque/cadastrar/', estoque.unidade.id, '/', estoque.vacina.id]);
  }

}
