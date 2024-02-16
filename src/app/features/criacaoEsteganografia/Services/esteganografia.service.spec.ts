/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EsteganografiaService } from './esteganografia.service';

describe('Service: Esteganografia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsteganografiaService]
    });
  });

  it('should ...', inject([EsteganografiaService], (service: EsteganografiaService) => {
    expect(service).toBeTruthy();
  }));
});
