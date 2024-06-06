import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AplicacaoRoutingModule } from './aplicacao-routing.module';
import { AplicacaoDetalheComponent } from './aplicacao-detalhe/aplicacao-detalhe.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AplicacaoDetalheComponent
  ],
  imports: [
    CommonModule,
    AplicacaoRoutingModule,
    FormsModule
  ]
})
export class AplicacaoModule { }
