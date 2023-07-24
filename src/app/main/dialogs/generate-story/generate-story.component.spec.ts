import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateStoryComponent } from './generate-story.component';

describe('GenerateStoryComponent', () => {
  let component: GenerateStoryComponent;
  let fixture: ComponentFixture<GenerateStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateStoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
