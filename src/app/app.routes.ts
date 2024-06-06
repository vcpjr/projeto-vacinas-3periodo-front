import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'vacina',
    loadChildren: () =>
      import('./vacina/vacina.module').then((m) => m.VacinaModule)
  },
  { path: 'aplicacao',
    loadChildren: () =>
      import('./aplicacao/aplicacao.module').then((m) => m.AplicacaoModule)
  }
];
