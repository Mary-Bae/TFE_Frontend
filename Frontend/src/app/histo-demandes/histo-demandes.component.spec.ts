import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoDemandesComponent } from './histo-demandes.component';

describe('HistoDemandesComponent', () => {
  let component: HistoDemandesComponent;
  let fixture: ComponentFixture<HistoDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoDemandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
