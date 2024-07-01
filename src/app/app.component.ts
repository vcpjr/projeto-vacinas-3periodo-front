import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RodapeComponent } from './shared/components/rodape/rodape.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RodapeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  title = 'projeto-vacinas-3periodo-front';

}
