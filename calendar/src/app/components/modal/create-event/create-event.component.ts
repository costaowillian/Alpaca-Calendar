import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AlertModalServiceService } from '../modal-service.service';

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
    private alertService: AlertModalServiceService
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

  // Método chamado quando o modal é confirmado
  onConfirm() {
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

  showConfirm() {
    const message = `Tem certeza que deseja deletar o evento ${this.description}`;
    const resutl$ = this.alertService.ShowConfirm('Deletar evento!', message);
    if (resutl$) {
      this.deleteResult.next(true);
      this.bsModalRef.hide();
    } else {
      this.bsModalRef.hide();
    }
  }
}
