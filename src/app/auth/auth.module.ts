import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';



const routes: Routes = [
    { path: '', component: AuthComponent },
  ];

@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        SharedModule,
    ],
})
export class AuthModule {}
