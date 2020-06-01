import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsNewsComponent } from './jobs-news.component';

describe('JobsNewsComponent', () => {
  let component: JobsNewsComponent;
  let fixture: ComponentFixture<JobsNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
