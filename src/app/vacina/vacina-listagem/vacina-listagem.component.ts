import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VacinaSeletor } from '../../shared/model/seletor/vacina.seletor';
import { VacinaDTO } from '../../shared/model/dto/vacina.DTO';
import Swal from 'sweetalert2';
import { EstoqueService } from '../../shared/service/estoque.service';

@Component({
  selector: 'app-vacina-listagem',
  templateUrl: './vacina-listagem.component.html',
  styleUrl: './vacina-listagem.component.scss'
})
export class VacinaListagemComponent implements OnInit{

    public vacinaSeletor: VacinaSeletor = new VacinaSeletor();
    public listaVacinasDTO : Array<VacinaDTO> = new Array();
    public listaDeVacinas : Array<string> = new Array();
    public listaDeCategorias : Array<string> = new Array();
    public listaDeFabricantes : Array<string> = new Array();
    public listaDeUnidades : Array<string> = new Array();

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

  public consultarTodasVacinas(): void {
    this.vacinaSeletor = new VacinaSeletor();
    this.pesquisarComFiltros();
  }

  public pesquisarComFiltros(): void {
    this.estoqueService.consultarComFiltros(this.vacinaSeletor).subscribe(
      (resultado) => {
        this.listaVacinasDTO = resultado;
        this.construirListasDeDisponiveisParaVacinar();
      },
      (erro) => {
        Swal.fire('Erro ao consultar a lista de vacinas com o(s) filtro(s) selecionado(s). ','','error');
      }
    );
  }

  public construirListasDeDisponiveisParaVacinar(): void{
    this.construirListaDeVacinas();
    this.construirListaDeCategorias();
    this.construirListaDeFabricantes();
    this.construirListaDeUnidades();
  }

  public construirListaDeVacinas(): void{
    this.listaDeVacinas = [];
    for(let vDTO of this.listaVacinasDTO){
      let vacinaExiste = false;
      for(let vacina of this.listaDeVacinas){
        if(vDTO.vacina.nome.trim().toLowerCase() == vacina.trim().toLowerCase()){
          vacinaExiste = true;
          break;
        }
      }
      if(!vacinaExiste){
        this.listaDeVacinas.push(vDTO.vacina.nome);
      }
    }
    this.listaDeVacinas.sort();
  }




  public construirListaDeCategorias(): void{
    this.listaDeCategorias = [];
    for(let vDTO of this.listaVacinasDTO){
      let categoriaExiste = false;
      for(let categoria of this.listaDeCategorias){
        if(vDTO.vacina.categoria.trim().toLowerCase() == categoria.trim().toLowerCase()){
          categoriaExiste = true;
          break;
        }
      }
      if(!categoriaExiste){
        this.listaDeCategorias.push(vDTO.vacina.categoria);
      }
    }
    this.listaDeCategorias.sort();
  }

  public construirListaDeFabricantes(): void{
    this.listaDeFabricantes = [];
    for(let vDTO of this.listaVacinasDTO){
      let fabricanteExiste = false;
      for(let fabricante of this.listaDeFabricantes){
        if(vDTO.fabricante.nome.trim().toLowerCase() == fabricante.trim().toLowerCase()){
          fabricanteExiste = true;
          break;
        }
      }
      if(!fabricanteExiste){
        this.listaDeFabricantes.push(vDTO.fabricante.nome);
      }
    }
    this.listaDeFabricantes.sort();
  }

  public construirListaDeUnidades(): void{
    this.listaDeUnidades = [];
    for(let vDTO of this.listaVacinasDTO){
      let unidadeExiste = false;
      for(let unidade of this.listaDeUnidades){
        if(vDTO.unidade.nome.trim().toLowerCase() == unidade.trim().toLowerCase()){
          unidadeExiste = true;
          break;
        }
      }
      if(!unidadeExiste){
        this.listaDeUnidades.push(vDTO.unidade.nome);
      }
    }
    this.listaDeUnidades.sort();
  }
}





