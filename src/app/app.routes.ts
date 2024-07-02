import { Routes } from '@angular/router';
import { PessoaDetalheComponent } from './pessoa/pessoa-detalhe/pessoa-detalhe.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadChildren:() => import('./home/home.module').then(m => m.HomeModule) },

  { path: 'login',loadChildren:() => import('./login/login.module').then(m => m.LoginModule) },

];

