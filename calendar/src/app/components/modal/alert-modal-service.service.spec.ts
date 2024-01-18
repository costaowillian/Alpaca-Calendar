/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertModalServiceService } from './modal-service.service';

describe('Service: AlertModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertModalServiceService],
    });
  });

  it('should ...', inject(
    [AlertModalServiceService],
    (service: AlertModalServiceService) => {
      expect(service).toBeTruthy();
    }
  ));
});
