import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewInboxComponent } from './admin-view-inbox.component';

describe('AdminViewInboxComponent', () => {
  let component: AdminViewInboxComponent;
  let fixture: ComponentFixture<AdminViewInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
