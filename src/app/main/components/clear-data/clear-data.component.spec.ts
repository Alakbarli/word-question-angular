import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearDataComponent } from './clear-data.component';

describe('ClearDataComponent', () => {
  let component: ClearDataComponent;
  let fixture: ComponentFixture<ClearDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
