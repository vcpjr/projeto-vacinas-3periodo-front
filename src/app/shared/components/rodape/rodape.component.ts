import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rodape', //Esse atributo que define o nome que será usado na tag para referenciar o componente
                          //<app-rodape></app-rodape>
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.scss']
})
export class RodapeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

