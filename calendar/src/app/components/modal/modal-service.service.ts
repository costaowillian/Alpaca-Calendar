import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AlertModalServiceService {
  constructor(private modalService: BsModalService) {}

  ShowConfirm(
    title: string,
    body: string,
    cancelTxt?: string,
    confirmTxt?: string
  ): Subject<boolean> {
    const bsModalRef: BsModalRef = this.modalService.show(
      ConfirmModalComponent
    );
    bsModalRef.content.title = title;
    bsModalRef.content.body = body;

    if (cancelTxt != null && confirmTxt != null) {
      bsModalRef.content.CancelText = cancelTxt;
      bsModalRef.content.OKText = confirmTxt;
    }

    return (<ConfirmModalComponent>bsModalRef.content).createResult;
  }

  ShowCreateEvent(): Subject<FormGroup> {
    const bsModalRef: BsModalRef = this.modalService.show(CreateEventComponent);

    return (<CreateEventComponent>bsModalRef.content).createResult;
  }

  ShowEditEvent(
    description: string,
    start: string,
    end: string,
    id: string
  ): Subject<FormGroup> {
    const bsModalRef: BsModalRef = this.modalService.show(CreateEventComponent);
    bsModalRef.content.description = description;
    bsModalRef.content.start = start;
    bsModalRef.content.end = end;
    bsModalRef.content.id = id;

    return (<CreateEventComponent>bsModalRef.content).createResult;
  }
}
