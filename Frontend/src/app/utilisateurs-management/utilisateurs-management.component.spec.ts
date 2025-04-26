import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateursManagementComponent } from './utilisateurs-management.component';

describe('UtilisateursManagementComponent', () => {
  let component: UtilisateursManagementComponent;
  let fixture: ComponentFixture<UtilisateursManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilisateursManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilisateursManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
