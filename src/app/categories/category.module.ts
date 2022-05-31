import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    CardComponent
  ],
  imports: [CommonModule],
})
export class CategoryModule {}
