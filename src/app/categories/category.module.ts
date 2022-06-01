import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CardComponent } from './card/card.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CreateCategoryComponent } from './create-category/create-category.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    CardComponent,
    CreateCardComponent,
    CreateCategoryComponent
  ],
  imports: [CommonModule],
})
export class CategoryModule {}
