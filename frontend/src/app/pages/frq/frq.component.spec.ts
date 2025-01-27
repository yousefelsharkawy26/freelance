import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrqComponent } from './frq.component';

describe('FrqComponent', () => {
  let component: FrqComponent;
  let fixture: ComponentFixture<FrqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
