import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent, QuizComponent } from './quiz';
import { SignInComponent, SignUpComponent } from './users';
import { AuthGuard } from './shared';
import { LayoutComponent } from './home/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./users/user.module').then((m) => m.UserModule),
  },
  {
    path: 'category/:id',
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'quiz-builder',
    loadChildren: () =>
      import('./quiz-builder/quiz-builder.module').then(
        (m) => m.QuizBuilderModule
      ),
    canActivate: [AuthGuard],
  },
  //otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
