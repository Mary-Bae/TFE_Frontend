import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesManagementComponent } from './employes-management.component';

describe('EmployesManagementComponent', () => {
  let component: EmployesManagementComponent;
  let fixture: ComponentFixture<EmployesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
