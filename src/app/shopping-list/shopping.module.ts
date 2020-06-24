import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    { path: '', component: ShoppingListComponent },
];

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
    ],

})
export class ShoppingModule { }
