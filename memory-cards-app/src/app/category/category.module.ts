import { NgModule } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
  },
];

@NgModule({
  declarations: [CategoryComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryModule {}
