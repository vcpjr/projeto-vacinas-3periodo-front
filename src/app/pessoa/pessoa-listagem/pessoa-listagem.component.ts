import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../shared/model/pessoa';
import { PessoaService } from '../../shared/service/pessoa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pessoa-listagem',
  templateUrl: './pessoa-listagem.component.html',
  styleUrl: './pessoa-listagem.component.scss'
})
export class PessoaListagemComponent implements OnInit{
                        // COMENTÁRIO 1
  public pessoa: Pessoa | null = null;
  public pessoas: Array<Pessoa> = new Array();

  constructor(
    private pessoaService : PessoaService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.consultarTodasPessoas();
  }

  private consultarTodasPessoas(): void{
    this.pessoaService.consultarTodos().subscribe(
      (resultado) => {
        this.pessoas = resultado;
      },
      (erro) => {
        Swal.fire('Erro ao consultar a lista de pessoas','','error');
      }
    );
  }

  public excluir(pessoaSelecionada: Pessoa): void{
    Swal.fire({
      title: 'Deseja realmente excluir o seu cadastro do sistema?',
      text: 'Essa ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.pessoaService.excluir(pessoaSelecionada.id).subscribe(
          (resultado) => {
          if(resultado){
            Swal.fire(pessoaSelecionada.nome + ' o seu cadastro foi excluído do sistema com sucesso!','','success');
            this.pessoa = null;
            this.consultarTodasPessoas();
          } else{
            Swal.fire(pessoaSelecionada.nome
              + ' como você já possui registro(s) de aplicação de vacina no sistema, não será possível excluir o seu cadastro.');
            }
          },
          erro => {
            Swal.fire('Erro!', 'Erro ao tentar excluir o seu cadastro do sistema: ' + erro.error.mensagem, 'error');
          }
        );
      }
    });
  }

  public limpar(){
    this.pessoa = null;
    this.consultarTodasPessoas();
  }

  public editar(pessoaSelecionada: Pessoa): void{
    this.router.navigate(['/pessoa/cadastro/', pessoaSelecionada.id]);
  }

}

/*
COMENTÁRIO 1:

| (pipe): Este símbolo é usado em TypeScript para indicar uma união de tipos.
Ele permite que a variável possa ter mais de um tipo. No caso Pessoa | null,
significa que a variável pessoa pode ser do tipo Pessoa ou do tipo null.

null (primeiro): Isto indica que um dos tipos permitidos para a variável
pessoa é null. Então, pessoa pode ser um objeto do tipo Pessoa ou pode
ser null.

= null (inicialização): Esta parte da declaração está inicializando a
variável pessoa com o valor null. Isso significa que, quando o objeto
PessoaListagemComponent for criado, pessoa começará com o valor null
até que seja atribuído um objeto do tipo Pessoa.

Portanto, public pessoa: Pessoa | null = null; significa que a variável
pessoa pode ser do tipo Pessoa ou null, e inicialmente é definida como null.

*/
