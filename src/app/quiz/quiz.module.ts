import { NgModule } from '@angular/core';
import { CardComponent } from '../quiz/card/card.component';
import { QuizComponent } from './quiz/quiz.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [CardComponent, QuizComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizModule {}
