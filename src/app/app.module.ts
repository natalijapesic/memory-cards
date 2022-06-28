import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './users/user.module';
import { QuizModule } from './quiz/quiz.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './shared';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from './shared/shared.module';
import { LoadingInterceptor } from './shared/utils/loading.interceptor';

@NgModule({
  declarations: [AppComponent, NavBarComponent, HomeComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    UserModule,
    QuizModule,
    SharedModule,
    MatMenuModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
