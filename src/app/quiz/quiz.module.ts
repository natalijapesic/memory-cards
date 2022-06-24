import { NgModule } from '@angular/core';
import { CardComponent } from '../quiz/card/card.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';
import { SharedModule } from '../shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    CardComponent,
    CreateCardComponent,
    CategoryComponent,
    CategoriesComponent,
    QuizComponent,
    QuizBuilderComponent,
  ],
  imports: [
    RouterModule,
    DragDropModule,
    SharedModule,
    MatAutocompleteModule,
  ],
  exports: [CategoriesComponent],
})
export class QuizModule {}
