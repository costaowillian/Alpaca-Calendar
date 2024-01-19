import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-access-page',
  templateUrl: './access-page.component.html',
  styleUrls: ['./access-page.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ transform: 'scale(0.5)' }), animate(100)]),
      transition(':leave', [animate(100, style({ transform: 'scale(0)' }))]),
    ]),
  ],
})
export class AccessPageComponent {
  showLogin: boolean = false;

  //Função para alternar entre componentes de login e inscrição
  changeComponent(newValue: boolean): void {
    this.showLogin = newValue;
  }
}
