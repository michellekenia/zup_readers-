import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './public/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupPageComponent } from './public/signup-page/signup-page.component';
import { FeedPageComponent } from './private/feed-page/feed-page.component';
import { BookProfileComponent } from './private/book-profile/book-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    FeedPageComponent,
    BookProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
