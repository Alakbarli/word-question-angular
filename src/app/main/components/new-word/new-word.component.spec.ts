import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWordComponent } from './new-word.component';

describe('NewWordComponent', () => {
  let component: NewWordComponent;
  let fixture: ComponentFixture<NewWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
