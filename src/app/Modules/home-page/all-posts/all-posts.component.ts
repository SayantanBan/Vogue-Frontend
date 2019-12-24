import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostService } from 'src/app/Shared/Services/post.service';
import { Post } from 'src/app/Shared/Models/Post';
import { _getOptionScrollPosition } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store'
import * as fromApp from '../../../Shared/Store/app.reducer'

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllPostsComponent implements OnInit {

  p: number = 1;
  allPosts: Post[];
  isLoading = true;
  _value: string;
  filteredPostList: Post[];
  selectedPostCountRadioButton: string = '0';

  constructor(private postService: PostService,
    private store: Store<fromApp.AppState>) { }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value.toLowerCase();
    this.filteredPostList = this.value ? this.performFilter(this.value) : this.allPosts;
  }

  performFilter(filterBy: string): Post[] {
    return this.allPosts.filter((post: Post) =>
      post.postName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.getPosts();
    this.filteredPostList = this.postService.getPosts();
  }

  getPosts(): void {
    // console.log("getPosts");
    // this.store
    // .select('posts')
    // .pipe(map(postState => postState.posts))
    // .subscribe((posts: Post[]) => {
    //   this.filteredPostList = posts;
    // });
    // console.log(this.allPosts)

    // this.postService.getAllPosts()
    //   .subscribe(result => {
    //     this.allPosts = result;
    //     this.filteredPostList = result;
    //     this.isLoading = false;
    //     this.spinner.hide();
    //   },
    //     error => console.log(error)
    //   )
    
    this.postService.postsChanged.subscribe(
      result => {
        this.filteredPostList = result;
      },
      error => console.log(error)
    )
  }

  onPostsCountRadioButtonChange(selectedRadioButtonValue: string): void {
    this.selectedPostCountRadioButton = selectedRadioButtonValue;
  }
}
