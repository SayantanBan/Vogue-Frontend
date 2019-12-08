import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () => import('./Modules/write-new-post/write-new-post.module').then(mod => mod.WriteNewPostModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./Modules/home-page/home-page.module').then(mod => mod.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
