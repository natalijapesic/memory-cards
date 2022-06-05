import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../quiz/card/card.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [
    CardComponent,
    CreateCardComponent,
    CreateCategoryComponent,
    CategoryComponent,
    CategoriesComponent,
    QuizComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [CategoriesComponent],
})
export class QuizModule {}
