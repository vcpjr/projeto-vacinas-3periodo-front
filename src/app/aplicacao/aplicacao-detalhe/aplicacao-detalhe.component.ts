import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aplicacao-detalhe',
  templateUrl: './aplicacao-detalhe.component.html',
  styleUrl: './aplicacao-detalhe.component.scss'
})
export class AplicacaoDetalheComponent {

  constructor(
    private vacinaService : VacinaService,
    private pessoaService : PessoaService,
    private aplicacaoService : AplicacaoSevice,
    private Router: Router, /*COMPONENTE PARA FAZER ROTEAMENTO
    ENTRE AS TELAS */
    private routes: ActivatedRoute, //COMPONENTE PARA CAPTURAR OS PARAMETROS DA URL
  ){

  }

  ngOnInit(): void {
    this.consultarTodosAsPessoas();
    // this.consultarTodosAsVacinas();
  }

  public consultarTodosAsPessoas(){
    this.pessoaService.consultarTodos().subscribe(
      (resultado) => {
        this.pessoas = resultado;
      },
      (erro) => {
        Swal.fire('Erro ao buscar a lista de pessoas','','error');
      }
    );
  }

}
