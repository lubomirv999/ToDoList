import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverHomePage } from './popover-home.page';

describe('PopoverHomePage', () => {
  let component: PopoverHomePage;
  let fixture: ComponentFixture<PopoverHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
