import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTaskPage } from './details-task.page';

describe('DetailsTaskPage', () => {
  let component: DetailsTaskPage;
  let fixture: ComponentFixture<DetailsTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
