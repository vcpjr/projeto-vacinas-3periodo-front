import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { PessoaService } from '../../shared/service/pessoa.service';
import { Pessoa } from '../../shared/model/pessoa';
import { PessoaSeletor } from '../../shared/model/seletor/pessoa.seletor';
import { Aplicacao } from '../../shared/model/aplicacao';
import { Vacina } from '../../shared/model/vacina';
import { Unidade } from '../../shared/model/unidade';
import { AplicacaoService } from '../../shared/service/aplicacao.service';
import { VacinaService } from '../../shared/service/vacina.service';
import { UnidadeService } from '../../shared/service/unidade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aplicacao-detalhe',
  templateUrl: './aplicacao-detalhe.component.html',
  styleUrl: './aplicacao-detalhe.component.scss'
})
export class AplicacaoDetalheComponent {

  public pessoas : Array<Pessoa> = new Array();
  public vacinas : Array<Vacina> = new Array();
  public unidades : Array<Unidade> = new Array();
  public seletor : PessoaSeletor = new PessoaSeletor();
  public aplicacao : Aplicacao = new Aplicacao();


  constructor(
    private pessoaService : PessoaService,
    private aplicacaoService : AplicacaoService,
    private vacinaService : VacinaService,
    private unidadeService : UnidadeService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.consultarTodasAsUnidades();
    this.consultarTodosAsPessoas();
    this.consultarTodasAsVacinas();
  }

  public pesquisar(){
    this.pessoaService.consultarPessoasComFiltro(this.seletor).subscribe(
      (resultado) => {
        this.pessoas = resultado;
      },
      (erro) => {
        Swal.fire('Erro ao buscar todas as pessoas com o seletor.','','error');
      }
    );
  }

  public compareById(r1: any, r2: any): boolean{
    return r1 && r2 ? r1.id_Pais === r2.id_Pais : r1 === r2;
  }

  public limparFormulario(): void {
    this.aplicacao = new Aplicacao();
  }

  public cadastrar(): void {
    this.aplicacaoService.salvar(this.aplicacao).subscribe(
      (resultado) => {
        Swal.fire('Aplicacao salva com sucesso!','', 'success');
        this.limparFormulario();
      },
      (erro) => {
        Swal.fire('Erro ao salvar a aplicacão da vacina: ' + erro.error.mensagem, 'error');
      }
    );
  }

  public consultarTodasAsVacinas(): void{
    this.vacinaService.consultarTodas().subscribe(
      (resultado) => {
        this.vacinas = resultado;
      },
      (erro) => {
        Swal.fire('Erro ao buscar a lista de vacinas','','error');
      }
    );
  }

  public consultarTodasAsUnidades(): void{
    this.unidadeService.consultarTodasUnidades().subscribe(
      (resultado) => {
        this.unidades = resultado;
      },
      (erro) => {
        Swal.fire('Erro ao buscar a lista de unidades','','error');
      }
    );
  }

  public consultarTodosAsPessoas(): void{
    this.pessoaService.consultarTodos().subscribe(
      (resultado) => {
        this.pessoas = resultado;
      },
      (erro) => {
        Swal.fire('Erro ao buscar a lista de pessoas','','error');
      }
    );
  }

  public voltar(): void {
    this.router.navigate(['/aplicacao']);
  }

}
