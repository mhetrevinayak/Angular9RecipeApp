import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    recipeChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Rassa', 'this is a testy Rassa',
    //         'https://recipes.snydle.com/files/2016/07/Maharashtrian-Mutton-Rassa-Recipe.jpg',
    //         [
    //             new Ingredient('mutton', 1),
    //             new Ingredient('chapati', 2)
    //         ]),
    //     new Recipe('Sukka', 'this is a testy chicken sukka',
    //         'https://cookieandkate.com/images/2020/03/vegan-chana-masala-recipe-2.jpg',
    //         [
    //             new Ingredient('chicken', 1),
    //             new Ingredient('spices', 3),
    //         ]),
    // ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingreds: Ingredient[]) {
        this.shoppingListService.addIngredients(ingreds);
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    AddRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}
