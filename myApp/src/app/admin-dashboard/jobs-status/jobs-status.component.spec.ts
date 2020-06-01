import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsStatusComponent } from './jobs-status.component';

describe('JobsStatusComponent', () => {
  let component: JobsStatusComponent;
  let fixture: ComponentFixture<JobsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
