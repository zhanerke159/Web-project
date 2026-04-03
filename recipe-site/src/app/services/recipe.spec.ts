import { TestBed } from '@angular/core/testing';

import { RecipeComponent } from '../recipe/recipe';

describe('Recipe', () => {
  let service: RecipeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
