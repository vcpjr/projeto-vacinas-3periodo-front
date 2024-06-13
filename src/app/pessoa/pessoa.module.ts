import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaListagemComponent } from './pessoa-listagem/pessoa-listagem.component';
import { FormsModule } from '@angular/forms';
import { PessoaDetalheComponent } from './pessoa-detalhe/pessoa-detalhe.component';


@NgModule({
  declarations: [
    PessoaListagemComponent,
    PessoaDetalheComponent
  ],
  imports: [
    CommonModule,
    PessoaRoutingModule,
    FormsModule
  ]
})
export class PessoaModule { }
