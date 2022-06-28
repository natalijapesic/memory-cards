import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories/categories.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CategoriesComponent, LayoutComponent],
  imports: [SharedModule],
})
export class HomeModule {}
