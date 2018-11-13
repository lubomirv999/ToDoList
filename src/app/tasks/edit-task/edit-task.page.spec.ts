import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskPage } from './edit-task.page';

describe('EditTaskPage', () => {
  let component: EditTaskPage;
  let fixture: ComponentFixture<EditTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
