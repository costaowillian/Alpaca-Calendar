import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() title!: string;
  @Input() body!: string;
  @Input() cancelTxt: string = 'Cancelar';
  @Input() confirmTxt: string = 'Confirmar';

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  onClose() {
    this.bsModalRef.hide();
  }

  onConfirm() {
    this.bsModalRef.hide();
  }
}
