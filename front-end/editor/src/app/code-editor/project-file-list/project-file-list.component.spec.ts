import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFileListComponent } from './project-file-list.component';

describe('ProjectFileListComponent', () => {
  let component: ProjectFileListComponent;
  let fixture: ComponentFixture<ProjectFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
