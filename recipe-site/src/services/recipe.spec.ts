import { TestBed } from '@angular/core/testing';

import { Recipe } from '../app/recipe/recipe';

describe('Recipe', () => {
  let service: Recipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Recipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
