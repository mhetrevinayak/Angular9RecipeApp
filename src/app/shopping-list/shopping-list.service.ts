import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {

  ingrdientsChanged = new Subject<Ingredient[]>();
  editingStarted = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('tomato', 7)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }
  addIngredient(ingred: Ingredient) {
    this.ingredients.push(ingred);
    this.ingrdientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingreds: Ingredient[]) {
    this.ingredients.push(...ingreds);
    this.ingrdientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingrd: Ingredient) {
    this.ingredients[index] = ingrd;
    this.ingrdientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingrdientsChanged.next(this.ingredients.slice());
  }
}
