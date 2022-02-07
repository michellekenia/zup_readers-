import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedPageComponent } from './private/feed-page/feed-page.component';
import { LoginPageComponent } from './public/login-page/login-page.component';
import { SignupPageComponent } from './public/signup-page/signup-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent},
  { path: 'feed', component: FeedPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
