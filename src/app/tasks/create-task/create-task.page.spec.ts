import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskPage } from './create-task.page';

describe('CreateTaskPage', () => {
  let component: CreateTaskPage;
  let fixture: ComponentFixture<CreateTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
