import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoryComponent, CreateCategoryComponent } from './quiz';
import { SignInComponent, SignUpComponent } from './users';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    // kreira kategoriju i odmah dodaje i kartice
    // kreirane kartica moze i kasnije da se doda u okviru strice
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    // kreira kategoriju i odmah dodaje i kartice
    // kreirane kartica moze i kasnije da se doda u okviru strice
  },
  {
    path: 'create-category',
    component: CreateCategoryComponent,
    // kreira kategoriju i odmah dodaje i kartice
    // kreirane kartica moze i kasnije da se doda u okviru strice
  },
  {
    path: 'category:id',
    component: CategoryComponent,
    //ovde takodje moze da se doda i kartica, da se vidi opis neke kategorije...
    // da se odigra kviz samo da tu jednu kategoriju
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
