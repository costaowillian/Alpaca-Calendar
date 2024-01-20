import { Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { IUserCredentials } from 'src/app/models/user';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent {
  @Output() showLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

  hasError: string;
  signUpForm = this.fb.group({
    nome: ['', [Validators.required]],
    sobrenome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.minLength(8), Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.hasError = '';
  }

  // Quando o botão no componente filho for clicado emitir um evento com o valor desejado
  handleOnClick(): void {
    this.showLogin.emit(true);
  }

  async handleAuthUser(user: IUserCredentials): Promise<void> {
    const isAuth = await this.authService.authUser(user);
    if (isAuth) {
      this.router.navigate(['home']);
    } else {
      this.hasError = 'Preencha todos os campos';
      return;
    }
  }

  async handleCreateUser(): Promise<void> {
    if (this.signUpForm.invalid) {
      this.hasError = 'por favor, preencha todos os campos!';
      return;
    } else if (this.signUpForm.valid) {
      const user = {
        firstName: this.signUpForm.value.nome!,
        lastName: this.signUpForm.value.sobrenome!,
        email: this.signUpForm.value.email!,
        senha: this.signUpForm.value.senha!,
      };

      const createdUser = await this.userService.createuser(user);

      if (createdUser) {
        this.handleAuthUser({
          email: this.signUpForm.value.email!,
          senha: this.signUpForm.value.senha!,
        });
      }
    } else {
      this.hasError = 'Falha ao criar usuário, por favor tente novamente!';
      return;
    }
  }
}
