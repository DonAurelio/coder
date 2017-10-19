import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceCodeEditorComponent } from './ace-code-editor.component';

describe('AceCodeEditorComponent', () => {
  let component: AceCodeEditorComponent;
  let fixture: ComponentFixture<AceCodeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceCodeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
