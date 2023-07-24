import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSnacbarComponent } from './error-snacbar.component';

describe('ErrorSnacbarComponent', () => {
  let component: ErrorSnacbarComponent;
  let fixture: ComponentFixture<ErrorSnacbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorSnacbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorSnacbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
