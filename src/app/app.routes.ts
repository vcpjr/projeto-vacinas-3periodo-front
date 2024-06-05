import { Routes } from '@angular/router';
import { VacinaModule } from './vacina/vacina.module';

export const routes: Routes = [
  { path: 'vacina',
    loadChildren: () =>
      import('./vacina/vacina.module').then((m) => m.VacinaModule)
  }
];
