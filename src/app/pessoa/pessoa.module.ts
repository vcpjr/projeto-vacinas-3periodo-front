import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaListagemComponent } from './pessoa-listagem/pessoa-listagem.component';
import { FormsModule } from '@angular/forms';
import { PessoaDetalheComponent } from './pessoa-detalhe/pessoa-detalhe.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxViacepModule } from "@brunoc/ngx-viacep";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PessoaDetalheComponent,
    PessoaListagemComponent
  ],
  imports: [
    CommonModule,
    PessoaRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxViacepModule,
    SharedModule
  ]
})
export class PessoaModule { }
