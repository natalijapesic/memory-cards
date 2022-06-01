import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../quiz/card/card.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CreateCategoryComponent } from './create-category/create-category.component';

@NgModule({
  declarations: [CardComponent, CreateCardComponent, CreateCategoryComponent],
  imports: [CommonModule],
})
export class QuizModule {}
