import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesDesactivesComponent } from './employes-desactives.component';

describe('EmployesDesactivesComponent', () => {
  let component: EmployesDesactivesComponent;
  let fixture: ComponentFixture<EmployesDesactivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployesDesactivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployesDesactivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
