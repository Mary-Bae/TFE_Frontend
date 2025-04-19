import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesEquipeComponent } from './demandes-equipe.component';

describe('DemandesEquipeComponent', () => {
  let component: DemandesEquipeComponent;
  let fixture: ComponentFixture<DemandesEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandesEquipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandesEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
