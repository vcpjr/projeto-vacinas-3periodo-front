import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstoqueDetalheComponent } from './estoque-detalhe/estoque-detalhe.component';

const routes: Routes = [
  { path: 'cadastrar', component: EstoqueDetalheComponent },
  { path: 'cadastrar/:idUnidade/:idVacina', component: EstoqueDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstoqueRoutingModule { }
