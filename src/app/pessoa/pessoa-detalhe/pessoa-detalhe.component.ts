import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../shared/model/pessoa';
import { PessoaService } from '../../shared/service/pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


import { NgxViacepService } from "@brunoc/ngx-viacep";
import { Endereco, CEPError } from "@brunoc/ngx-viacep";
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-pessoa-detalhe',
  templateUrl: './pessoa-detalhe.component.html',
  styleUrl: './pessoa-detalhe.component.scss'
})
export class PessoaDetalheComponent implements OnInit{

  public idPessoa: number;
  public pessoa: Pessoa = new Pessoa();

  constructor(
    private pessoaService : PessoaService,
    private router: Router,
    private route: ActivatedRoute,
    private viacep: NgxViacepService
  ){

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) =>{
        this.idPessoa = params['idPessoa'];
        if(this.idPessoa) {
          this.consultarPessoaPorId();
        }
      }
    )
  }

  public consultarPessoaPorId(): void{
    this.pessoaService.consultarPorId(this.idPessoa).subscribe(
      (resultado) => {
        this.pessoa = resultado;
      },
      (erro) => {
        Swal.fire(
          'Erro ao buscar o usuário ' + this.pessoa.nome
          + 'no banco de dados para editá-la',erro,'error'
        );
      }
    )
  }

  public salvar(): void{
    if(this.idPessoa && this.validarFormulario()){
      this.atualizar();
    } else {
      if(this.validarFormulario()){
        this.inserir();
      }
    }
  }

  public inserir(): void {
    this.pessoaService.salvar(this.pessoa).subscribe(
      (resultado) => {
        Swal.fire(
          this.pessoa.nome + ' você foi cadastrado com sucesso no sistema!','', 'success'
        );
        this.voltar();
      },
      (erro) => {
        Swal.fire(
          this.pessoa.nome + ' houve um erro ao tentar efetuar o seu cadastro no sistema: '
        + erro.error.mensagem, 'error' + ' Tente novamente.'
        );
      }
    );
  }

  private validarFormulario(): boolean{
    if(!this.pessoa.nome){
      Swal.fire('Por favor, preencha o campo nome.', '', 'error');
      return false;
    } else if(!this.pessoa.dataNascimento){
      Swal.fire('Por favor, insira a sua data de nascimento.', '', 'error');
      return false;
    } else if(!this.pessoa.tipo){
      Swal.fire('Por favor, selecione o tipo.', '', 'error');
      return false;
    } else if(!this.pessoa.sexo){
      Swal.fire('Por favor, selecione uma opção no campo sexo.', '', 'error');
      return false;
    } else if(!this.pessoa.cpf) {
      Swal.fire('Por favor, insira o número do seu cpf.', '', 'error');
      return false;
    } else if(!this.pessoa.login) {
      Swal.fire('Por favor, preencha o campo login.', '', 'error');
      return false;
    } else if(!this.pessoa.senha) {
      Swal.fire('Por favor, preencha o campo senha.', '', 'error');
      return false;
    } else if(this.pessoa.doencaPreexistente == null) {
      Swal.fire('Por favor, preencha o campo doença preexistente.', '', 'error');
      return false;
    } else if(!this.pessoa.enderecoDaPessoa.cep) {
      Swal.fire('Por favor, preencha o campo CEP.', '', 'error');
      return false;
    } else if(!this.pessoa.enderecoDaPessoa.pais) {
      Swal.fire('Por favor, preencha o campo País.', '', 'error');
      return false;
    } else if(!this.pessoa.enderecoDaPessoa.estado) {
      Swal.fire('Por favor, preencha o campo estado.', '', 'error');
      return false;
    } else if(!this.pessoa.enderecoDaPessoa.localidade) {
      Swal.fire('Por favor, preencha o campo cidade.', '', 'error');
      return false;
    } else if(!this.pessoa.enderecoDaPessoa.bairro) {
      Swal.fire('Por favor, preencha o campo bairro.', '', 'error');
      return false;
    } else if(!this.pessoa.enderecoDaPessoa.logradouro) {
      Swal.fire('Por favor, preencha o campo logradouro.', '', 'error');
      return false;
    } else if(!this.pessoa.enderecoDaPessoa.numero) {
      Swal.fire('Por favor, preencha o campo número.', '', 'error');
      return false;
    } else if(!this.pessoa.contatoDaPessoa.telefone) {
      Swal.fire('Por favor, preencha o campo telefone.', '', 'error');
      return false;
    } else if(!this.pessoa.contatoDaPessoa.email) {
      Swal.fire('Por favor, preencha o campo email.', '', 'error');
      return false;
    }
    return true;
  }

  public atualizar(): void {
    this.pessoaService.atualizar(this.pessoa).subscribe(
      (resultado) => {
        Swal.fire(this.pessoa.nome
          + ' o seu cadastro foi atualizado com sucesso no sistema!','', 'success');
          this.voltar();
      },
      (erro) => {
        Swal.fire(this.pessoa.nome
          + ' houve um erro ao tentar atualizar o seu cadastro no sistema: '
          + erro.error.mensagem, 'error' + ' Tente novamente.');
      }
    );
  }

  public voltar(): void {
    this.router.navigate(['/']);
  }

  public limparFormulario(): void {
    this.pessoa = new Pessoa();
  }

  public buscarCEP(): void {
    if (this.pessoa.enderecoDaPessoa.cep) {
      this.viacep.buscarPorCep(this.pessoa.enderecoDaPessoa.cep)
        .pipe(
          catchError((error: CEPError) => {
            console.log(error.message);
            Swal.fire('Erro ao buscar CEP', error.message, 'error');
            return EMPTY;
          })
        )
        .subscribe((endereco: Endereco) => {
          // Atualize os campos do endereço com os dados obtidos
          this.pessoa.enderecoDaPessoa.logradouro = endereco.logradouro;
          this.pessoa.enderecoDaPessoa.complemento = endereco.complemento;
          this.pessoa.enderecoDaPessoa.bairro = endereco.bairro;
          this.pessoa.enderecoDaPessoa.localidade = endereco.localidade;
          this.pessoa.enderecoDaPessoa.estado = endereco.uf;
          this.pessoa.enderecoDaPessoa.pais = 'Brasil'; // Pode ser adicionado automaticamente, se desejar
        });
    }
  }

}
