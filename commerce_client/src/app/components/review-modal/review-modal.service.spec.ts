/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReviewModalService } from './review-modal.service';

describe('Service: ReviewModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewModalService]
    });
  });

  it('should ...', inject([ReviewModalService], (service: ReviewModalService) => {
    expect(service).toBeTruthy();
  }));
});
