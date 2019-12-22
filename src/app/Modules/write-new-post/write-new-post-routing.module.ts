import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPostComponent } from './new-post/new-post.component';
import { AuthGuardService } from 'src/app/Authguard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: NewPostComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteNewPostRoutingModule { }
