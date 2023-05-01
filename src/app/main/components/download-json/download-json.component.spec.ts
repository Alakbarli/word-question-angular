import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadJsonComponent } from './download-json.component';

describe('DownloadJsonComponent', () => {
  let component: DownloadJsonComponent;
  let fixture: ComponentFixture<DownloadJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
