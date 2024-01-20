import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.hasError = '';
  }

  // Quando o botão no componente filho for clicado emitir um evento com o valor desejado
  handleOnClick(): void {
    this.showLogin.emit(false);
  }

  async handleAuth() {
    if (this.loginForm.invalid) {
      this.hasError = 'Preencha as suas credencias';
      return;
    }

    const user = {
      email: this.loginForm.value.email!,
      senha: this.loginForm.value.senha!,
    };

    const isAuth = await this.authService.authUser(user);
    if (isAuth) {
      this.router.navigate(['home']);
    } else {
      this.hasError = 'Credencias inválidas, por favor tente novamente!';
    }
  }
}
