import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CreateCardComponent } from './create-card/create-card.component';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';

@NgModule({
  declarations: [CreateCardComponent, QuizBuilderComponent],
  imports: [
    SharedModule,
    MatAutocompleteModule,
  ],
})
export class QuizBuilderModule {}
