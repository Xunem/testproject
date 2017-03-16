/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TopicServiceService } from './topic-service.service';

describe('TopicServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicServiceService]
    });
  });

  it('should ...', inject([TopicServiceService], (service: TopicServiceService) => {
    expect(service).toBeTruthy();
  }));
});
