import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

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

  createResult!: Subject<FormGroup>;
  //formulário de criação de envento
  eventoForm = this.fb.group({
    description: ['', [Validators.required]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]],
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {
    this.hasError = '';
  }

  ngOnInit() {
    this.createResult = new Subject();
  }

  // Método chamado quando o modal é fechado sem confirmação
  onClose() {
    this.bsModalRef.hide();
  }

  // Método chamado quando o modal é confirmado
  onConfirm() {
    this.crateAndClose(true);
  }

  // Método privado para realizar a criação e fechar o modal
  private crateAndClose(value: boolean) {
    this.createResult.next(this.eventoForm);
    this.bsModalRef.hide();
  }
}
