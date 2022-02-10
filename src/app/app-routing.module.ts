import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedPageComponent } from './private/feed-page/feed-page.component';
import { LoginPageComponent } from './public/login-page/login-page.component';
import { SignupPageComponent } from './public/signup-page/signup-page.component';
import { PrivateGuard } from './shared/guards/private.guard';
import { PublicGuard } from './shared/guards/public.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [PublicGuard]},
  { path: 'signup', component: SignupPageComponent, canActivate: [PublicGuard]},
  { path: 'feed', component: FeedPageComponent, canActivate: [PrivateGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
