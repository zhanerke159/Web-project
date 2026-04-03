import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnRecipeComponent } from './own-recipe';

describe('OwnRecipe', () => {
  let component: OwnRecipeComponent;
  let fixture: ComponentFixture<OwnRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnRecipeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnRecipeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
