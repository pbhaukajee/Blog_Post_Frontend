import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NewPostFormComponent } from './pages/new-post-form/new-post-form.component';
import { PostListComponent } from './pages/post-list/posts.component';
import { IndividualPostComponent } from './pages/individual-post/individual-post.component';
import { PostViewOnlyComponent } from './pages/post-view-only/post-view-only.component';
import { SearchByTitleComponent } from './pages/search-by-title/search-by-title.component';
import { SearchByTitleViewOnlyComponent } from './pages/search-by-title-view-only/search-by-title-view-only.component';
import { UpdatePostFormComponent } from './update-post-form/update-post-form.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'new-post-form', component: NewPostFormComponent },
  { path: 'update/:id', component: UpdatePostFormComponent },
  { path: 'individual-post/:id', component: IndividualPostComponent },

  { path: 'post-view-only/:id', component: PostViewOnlyComponent },
  { path: 'search-by-title', component: SearchByTitleComponent },
  {
    path: 'search-by-title-view-only',
    component: SearchByTitleViewOnlyComponent,
  },
];
