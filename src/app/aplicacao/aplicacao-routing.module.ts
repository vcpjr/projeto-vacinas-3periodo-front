import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AplicacaoDetalheComponent } from './aplicacao-detalhe/aplicacao-detalhe.component';

const routes: Routes = [
  { path: "cadastro", component: AplicacaoDetalheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicacaoRoutingModule { }
