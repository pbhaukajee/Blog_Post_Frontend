import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NewPostFormComponent } from './pages/new-post-form/new-post-form.component';
import { PostListComponent } from './pages/post-list/posts.component';
import { IndividualPostComponent } from './pages/individual-post/individual-post.component';
import { PostViewOnlyComponent } from './pages/post-view-only/post-view-only.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'new-post-form', component: NewPostFormComponent },
  { path: 'individual-post/:id', component: IndividualPostComponent },
  { path: 'post-view-only/:id', component: PostViewOnlyComponent },
];
