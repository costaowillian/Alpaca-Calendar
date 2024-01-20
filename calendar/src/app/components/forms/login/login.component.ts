import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() showLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

  hasError: string;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.minLength(8), Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.hasError = '';
  }

  // Quando o botão no componente filho for clicado emitir um evento com o valor desejado
  handleOnClick(): void {
    this.showLogin.emit(false);
  }

  handleAuth() {
    if (this.loginForm.invalid) {
      this.hasError = 'Preencha as suas credencias';
      return;
    }

    const user = {
      email: this.loginForm.value.email!,
      senha: this.loginForm.value.senha!,
    };

    this.authService.authUser(user);
  }
}
