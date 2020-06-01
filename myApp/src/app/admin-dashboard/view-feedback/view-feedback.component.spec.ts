import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedbackComponent } from './view-feedback.component';

describe('ViewFeedbackComponent', () => {
  let component: ViewFeedbackComponent;
  let fixture: ComponentFixture<ViewFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
