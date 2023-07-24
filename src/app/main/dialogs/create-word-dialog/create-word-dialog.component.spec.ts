import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWordDialogComponent } from './create-word-dialog.component';

describe('CreateWordDialogComponent', () => {
  let component: CreateWordDialogComponent;
  let fixture: ComponentFixture<CreateWordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWordDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
