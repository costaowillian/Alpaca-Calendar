import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent {
  @Output() showLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

  signUpForm = this.fb.group({
    nome: ['', [Validators.required]],
    sobrenome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.minLength(8), Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  // Quando o botão no componente filho for clicado emitir um evento com o valor desejado
  handleOnClick(): void {
    this.showLogin.emit(true);
  }
}
