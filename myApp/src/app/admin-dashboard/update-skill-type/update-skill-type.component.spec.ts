import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSkillTypeComponent } from './update-skill-type.component';

describe('UpdateSkillTypeComponent', () => {
  let component: UpdateSkillTypeComponent;
  let fixture: ComponentFixture<UpdateSkillTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSkillTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSkillTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
