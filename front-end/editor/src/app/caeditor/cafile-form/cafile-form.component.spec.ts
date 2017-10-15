import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafileFormComponent } from './cafile-form.component';

describe('CafileFormComponent', () => {
  let component: CafileFormComponent;
  let fixture: ComponentFixture<CafileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
