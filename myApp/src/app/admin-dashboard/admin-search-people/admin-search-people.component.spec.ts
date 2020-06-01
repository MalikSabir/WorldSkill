import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSearchPeopleComponent } from './admin-search-people.component';

describe('AdminSearchPeopleComponent', () => {
  let component: AdminSearchPeopleComponent;
  let fixture: ComponentFixture<AdminSearchPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSearchPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSearchPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
