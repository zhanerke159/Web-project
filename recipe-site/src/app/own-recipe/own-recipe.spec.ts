import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnRecipe } from './own-recipe';

describe('OwnRecipe', () => {
  let component: OwnRecipe;
  let fixture: ComponentFixture<OwnRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnRecipe],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnRecipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
