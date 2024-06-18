import { Component } from '@angular/core';
import { Unidade } from '../../shared/model/unidade';
import { Estoque } from '../../shared/model/estoque';
import { UnidadeService } from '../../shared/service/unidade.service';
import Swal from 'sweetalert2';
import { Vacina } from '../../shared/model/vacina';
import { VacinaService } from '../../shared/service/vacina.service';
import { EstoqueService } from '../../shared/service/estoque.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-estoque-detalhe',
  templateUrl: './estoque-detalhe.component.html',
  styleUrl: './estoque-detalhe.component.scss'
})
export class EstoqueDetalheComponent {

  public unidades : Array<Unidade> = new Array();
  public vacinas : Array<Vacina> = new Array();
  public estoque : Estoque = new Estoque();
  public idUnidade: number;
  public idVacina: number;

  constructor(
    private unidadeService: UnidadeService,
    private vacinaService: VacinaService,
    private estoqueService: EstoqueService,
    private router: Router,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {

    this.consultarTodasUnidades();
    this.consultarTodasVacinas();


    /*

    'idUnidade' e 'idVacina' os quais estão dentro de params['idUnidade'] e
    params['idVacina'] estão declarados dentro do arquivo de rotas do módulo:

    { path: 'cadastrar/:idUnidade/:idVacina', component: EstoqueDetalheComponent }

    */
    this.route.params.subscribe(
      (params) =>{
        this.idUnidade = params['idUnidade'];
        this.idVacina = params['idVacina'];
        if(this.idUnidade && this.idVacina) {
          this.consultarEstoquePorIds();
        }
      }
    )

  }

  public consultarTodasUnidades(){
    this.unidadeService.consultarTodas().subscribe(
      (resultado) => {
        this.unidades = resultado;
      },
      (erro) => {
        Swal.fire('Erro ao buscar a lista de unidades','','error');
      }
    );
  }

  public consultarTodasVacinas(){
    this.vacinaService.consultarTodas().subscribe(
      (resultado) => {
        this.vacinas = resultado;
      },
      (erro) => {
        Swal.fire('Erro ao buscar a lista de vacinas','','error');
      }
    );
  }

  public consultarEstoquePorIds(): void{
    this.estoqueService.consultarEstoquePorIds(this.idUnidade, this.idVacina).subscribe(
      (resultado) => {
        this.estoque = resultado;
      },
      (erro) => {
        Swal.fire('Erro ao buscar o estoque da unidade de id '
          + this.idUnidade + ' e da vacina de id ' + this.idVacina + ' no banco de dados para editá-lo',erro,'error');
      }
    )
  }

  public compareById(r1: any, r2: any): boolean{
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  public limparFormulario(): void {
    this.estoque = new Estoque();
  }

  public salvar(): void{
    if(this.idUnidade && this.idVacina){
      this.atualizar();
    } else {
      this.inserir();
    }
  }

  public inserir(): void {
    this.estoqueService.salvar(this.estoque).subscribe(
      (resultado) => {
        if (resultado != null) {
          Swal.fire('Estoque cadastrado com sucesso!', '', 'success');
          this.limparFormulario();
        } else {
          Swal.fire('Erro ao tentar cadastrar o estoque: Entrada duplicada', 'error');
        }
      },
      (erro) => {
        Swal.fire('Erro ao tentar cadastrar o estoque: ' + erro.error.mensagem, 'error');
      }
    );
  }

    public atualizar(): void {
      this.estoqueService.atualizar(this.estoque).subscribe(
        (resultado) => {
          if (resultado) {
            Swal.fire('Estoque atualizado com sucesso!', '', 'success');
            this.voltar();
          } else {
            Swal.fire('O estoque da UNIDADE ' + this.estoque.unidade.nome
                    + ' não possui nenhum lote da VACINA ' + this.estoque.vacina.nome
                    + ' para ser atualizado. Verifique os lotes disponíveis dessa unidade e tente novamente.'
                    , '', 'error');
          }
        },
        (erro) => {
          Swal.fire('Erro ao tentar atualizar o estoque. ' + erro.error.mensagem, '', 'error');
        }
      );
    }

  public voltar(): void {
    this.router.navigate(['/estoque/listagem']);
  }

}
