import { Component, OnInit, OnDestroy, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: true }) slForm: NgForm;
  editMode = false;
  editItemIndex: number;
  subscription: Subscription;
  editIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }


  ngOnInit(): void {
    this.subscription = this.shoppingListService.editingStarted.subscribe((index: number) => {
      this.editItemIndex = index;
      this.editMode = true;
      this.editIngredient = this.shoppingListService.getIngredient(this.editItemIndex);
      this.slForm.setValue({
        name: this.editIngredient.name,
        amount: this.editIngredient.amount,
      });
    });
  }

  onAddItem(form: NgForm) {

    const value = form.value;
    const ing = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, ing);
    }
    else {
      this.shoppingListService.addIngredient(ing);
    }
    form.reset();
    this.editMode = false;
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
