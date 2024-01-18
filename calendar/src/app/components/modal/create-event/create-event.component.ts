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
  hasError: string;
  selectedColor: string = '';
  eventTypes: { label: string; color: string }[] = [
    { label: 'Reunião', color: '#2A84FF' },
    { label: 'Evento social', color: '#727EEE' },
    { label: 'Outros', color: '#FFC267' },
  ];
  eventoForm = this.fb.group({
    description: ['', [Validators.required]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]],
    color: [''],
  });

  createResult!: Subject<FormGroup>;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {
    this.hasError = '';
  }

  ngOnInit() {
    this.createResult = new Subject();
  }

  onClose() {
    this.crateAndClose(false);
  }

  onConfirm() {
    this.crateAndClose(true);
  }

  private crateAndClose(value: boolean) {
    this.createResult.next(this.eventoForm);
    this.bsModalRef.hide();
  }
}
