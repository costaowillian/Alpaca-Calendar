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

  // Criar um novo usuário
  async handleCreateUser(): Promise<void> {
    //verifica se o formulário está valido
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

      // Criar usuário e verificar se já existe
      const createdUser = await this.userService.createUser(user);

      if (createdUser && createdUser == 422) {
        this.hasError = 'Esté e-mail já está cadastrado!';
        return;
      } else if (createdUser) {
        // Se o usuário foi criado com sucesso, autenticar automaticamente
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
