import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './users/user.module';
import { QuizModule } from './quiz/quiz.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { JwtInterceptor } from './shared';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from './shared/shared.module';
import { LoadingInterceptor } from './shared/utils/loading.interceptor';
import { CategoryModule } from './category/category.module';
import { QuizBuilderModule } from './quiz-builder/quiz-builder.module';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserModule,
    QuizModule,
    CategoryModule,
    QuizBuilderModule,
    SharedModule,
    MatMenuModule,
    HomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
