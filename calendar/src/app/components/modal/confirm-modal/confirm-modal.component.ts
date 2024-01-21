import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

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

  createResult!: Subject<boolean>;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.createResult = new Subject();
  }

  onClose() {
    this.cloeAndConfirm(false);
  }

  onConfirm() {
    this.cloeAndConfirm(true);
  }

  cloeAndConfirm(value: boolean): Promise<boolean> {
    this.createResult.next(value);
    this.bsModalRef.hide();
  }
}
