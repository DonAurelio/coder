import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaeditorComponent } from './caeditor.component';

describe('CaeditorComponent', () => {
  let component: CaeditorComponent;
  let fixture: ComponentFixture<CaeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
