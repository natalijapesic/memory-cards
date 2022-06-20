import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardComponent, CategoryComponent } from './quiz';
import { QuizBuilderComponent } from './quiz/quiz-builder/quiz-builder.component';
import { QuizComponent } from './quiz/quiz/quiz.component';
import { SignInComponent, SignUpComponent } from './users';
import { AuthGuard } from './shared';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'card',
    component: CardComponent,
  },
  {
    path: 'category/:id',
    component: CategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'quizBuilder',
    component: QuizBuilderComponent,
    canActivate: [AuthGuard],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
