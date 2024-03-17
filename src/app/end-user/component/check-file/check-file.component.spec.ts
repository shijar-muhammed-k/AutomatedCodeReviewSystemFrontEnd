import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckFileComponent } from './check-file.component';

describe('CheckFileComponent', () => {
  let component: CheckFileComponent;
  let fixture: ComponentFixture<CheckFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckFileComponent]
    });
    fixture = TestBed.createComponent(CheckFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
