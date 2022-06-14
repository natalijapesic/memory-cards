import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../quiz/card/card.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [
    CardComponent,
    CreateCardComponent,
    CreateCategoryComponent,
    CategoryComponent,
    CategoriesComponent,
    QuizComponent,
    QuizBuilderComponent,
  ],
  imports: [RouterModule, SharedModule, DragDropModule, MatIconModule],
  exports: [CategoriesComponent],
})
export class QuizModule {}
