import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierCommunComponent } from './calendrier-commun.component';

describe('CalendrierCommunComponent', () => {
  let component: CalendrierCommunComponent;
  let fixture: ComponentFixture<CalendrierCommunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendrierCommunComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendrierCommunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
