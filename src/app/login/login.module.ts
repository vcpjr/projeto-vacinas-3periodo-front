import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from '../auth/request.interceptor';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [ // Comentário 1 abaixo
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ // Comentário 2 abaixo
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
})
export class LoginModule {

}

/*
"COMENTÁRIO 1"

CommonModule: Contém diretivas, pipes e componentes comuns do Angular.

LoginRoutingModule: Gerencia as rotas específicas do módulo de login.

FormsModule: Suporte para formulários template-driven.

HttpClientModule: Realiza requisições HTTP.

*/

/*
  "COMENTÁRIO 2"

  Usado para interceptar as requisições HTTP:

  "provide": HTTP_INTERCEPTORS: Fornece interceptores HTTP.

  "useClass": RequestInterceptor: Usa a classe RequestInterceptor para interceptar.

  "multi: true": Permite múltiplos interceptores.
*/
