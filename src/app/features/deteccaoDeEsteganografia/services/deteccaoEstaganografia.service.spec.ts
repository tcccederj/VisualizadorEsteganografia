/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeteccaoEstaganografiaService } from './deteccaoEstaganografia.service';

describe('Service: DeteccaoEstaganografia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeteccaoEstaganografiaService]
    });
  });

  it('should ...', inject([DeteccaoEstaganografiaService], (service: DeteccaoEstaganografiaService) => {
    expect(service).toBeTruthy();
  }));
});
