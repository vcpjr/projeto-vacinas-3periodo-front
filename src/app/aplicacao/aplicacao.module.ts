import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AplicacaoRoutingModule } from './aplicacao-routing.module';
import { AplicacaoDetalheComponent } from './aplicacao-detalhe/aplicacao-detalhe.component';
import { FormsModule } from '@angular/forms';
import { AplicacaoListagemComponent } from './aplicacao-listagem/aplicacao-listagem.component';


@NgModule({
  declarations: [
    AplicacaoDetalheComponent,
    AplicacaoListagemComponent
  ],
  imports: [
    CommonModule,
    AplicacaoRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AplicacaoModule { }
