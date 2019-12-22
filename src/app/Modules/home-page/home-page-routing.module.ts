import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPostComponent } from '../write-new-post/new-post/new-post.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { AuthGuardService } from 'src/app/Authguard/auth-guard.service';

const routes: Routes = [
  {path: '',redirectTo: 'dashboard/posts', pathMatch: 'full'},
  {path: 'dashboard',component:DashboardComponent,
    children:[
      {
        path:'detail/:id',
        component: PostDetailComponent, 
      },
      {
        path: 'posts',
        component: AllPostsComponent, 
      },
      {
        path: 'myposts',
        component: UserPostsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'createPost',
        loadChildren: () => import('../write-new-post/write-new-post.module').then(mod => mod.WriteNewPostModule)
      },
      {
        path: 'createPost/:id',
        loadChildren: () => import('../write-new-post/write-new-post.module').then(mod => mod.WriteNewPostModule)
      },
      {
        path: "**",
        redirectTo: 'posts'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
