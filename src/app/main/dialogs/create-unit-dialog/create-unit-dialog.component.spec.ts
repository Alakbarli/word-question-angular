import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUnitDialogComponent } from './create-unit-dialog.component';

describe('CreateUnitDialogComponent', () => {
  let component: CreateUnitDialogComponent;
  let fixture: ComponentFixture<CreateUnitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUnitDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
