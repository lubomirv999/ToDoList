import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthHomePage } from './auth-home.page';

describe('AuthHomePage', () => {
  let component: AuthHomePage;
  let fixture: ComponentFixture<AuthHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
