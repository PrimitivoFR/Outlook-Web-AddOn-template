import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachListComponent } from './attach-list.component';

describe('AttachListComponent', () => {
  let component: AttachListComponent;
  let fixture: ComponentFixture<AttachListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
