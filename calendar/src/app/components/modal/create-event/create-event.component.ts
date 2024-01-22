import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY, Subject, switchMap, take } from 'rxjs';
import { AlertModalServiceService } from '../modal-service.service';
import { EventServiceService } from 'src/app/services/event-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {
  // Propriedades de entrada para descrição, início e fim do evento
  @Input() description: string = '';
  @Input() start: string = '';
  @Input() end: string = '';
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() id: string = '';

  // Mensagem de erro, formulário do evento e resultado da criação
  hasError: string;
  hasMissingFields: string;

  createResult!: Subject<FormGroup>;
  deleteResult!: Subject<boolean>;

  //formulário de criação de envento
  eventoForm = this.fb.group({
    description: ['', [Validators.required]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]],
  });

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private alertService: AlertModalServiceService,
    private eventService: EventServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.hasError = '';
    this.hasMissingFields = '';
  }

  ngOnInit() {
    this.createResult = new Subject();
    this.deleteResult = new Subject();
  }

  // Método chamado quando o modal é fechado sem confirmação
  onClose() {
    this.bsModalRef.hide();
  }

  //Método que faz a validação das datas
  isValidDate() {
    const start = this.eventoForm.value.start!;
    const end = this.eventoForm.value.end!;
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Verifica se a data de término é menor que a de início
    if (endDate < startDate) {
      this.hasMissingFields = 'A data de término é anterior à data de início';
      return false;
    }

    // Verifica se a data de término é igual à de início e a hora de término é menor que a de início
    if (
      endDate.getTime() === startDate.getTime() &&
      endDate.getHours() < startDate.getHours()
    ) {
      this.hasMissingFields =
        'A hora de término é menor que a de início no mesmo dia';
      return false;
    }

    // Verifica se a data de término é igual à de início, a hora de término é igual e os minutos de término são menores
    if (
      endDate.getTime() === startDate.getTime() &&
      endDate.getHours() === startDate.getHours() &&
      endDate.getMinutes() < startDate.getMinutes()
    ) {
      this.hasMissingFields =
        'Os minutos de término são menores que os minutos de início no mesmo dia';
      return false;
    }

    return true;
  }

  // Método chamado quando o modal é confirmado
  onConfirm() {
    //Verifica as datas
    if (!this.isValidDate()) {
      return;
    }

    //verifica se o formulário é valido
    if (this.eventoForm.invalid) {
      this.hasMissingFields = 'Preencha todos os campos';
      return;
    }

    this.crateAndClose();
  }

  // Método privado para realizar a criação e fechar o modal
  private crateAndClose() {
    this.createResult.next(this.eventoForm);
    this.bsModalRef.hide();
  }

  // Método para exibir o popup de confirmação de exclusão
  showConfirm() {
    const message = `Tem certeza que deseja deletar o evento ${this.description}`;
    const resutl$ = this.alertService.ShowConfirm('Deletar evento!', message);

    resutl$
      .asObservable()
      .pipe(
        take(1),
        switchMap((resutl) =>
          resutl ? this.eventService.deleteEvent(this.id) : EMPTY
        )
      )
      .subscribe(
        (succes) => {
          // Ação a ser realizada após a exclusão bem-sucedida e um timeout de 1 segundo
          this.showSuccess('Tudo certo', 'O evento foi deletado com sucesso');
          this.bsModalRef.hide();
          // Redirecionamento e recarregamento da página após 1 segundo
          setTimeout(() => {
            this.router.navigate(['']);
            location.reload();
          }, 1000);
        },
        (error) => {
          // Ação a ser realizada em caso de erro durante a exclusão
          this.showError(
            'Falha ao deletar',
            'O evento não foi deletado, por favor tente novamente!'
          );
          this.bsModalRef.hide();
        }
      );
  }

  // Método para exibir uma mensagem de sucesso usando o Toastr
  showSuccess(title: string, message: string) {
    this.toastr.success(message, title);
  }

  // Método para exibir uma mensagem de erro usando o Toastr
  showError(title: string, message: string) {
    this.toastr.error(message, title);
  }
}
