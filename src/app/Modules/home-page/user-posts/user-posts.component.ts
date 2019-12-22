import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Shared/Services/post.service';
import { UserService } from 'src/app/Shared/Services/user.service';
import { TOKEN_USER } from 'src/app/Shared/Services/auth.constant';
import { Post } from 'src/app/Shared/Models/Post';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  p: number = 1;
  allPosts: Post[];
  isLoading = true;
  _value: string;
  filteredPostList: Post[];

  get value(): string {
    // console.log("getter");
    // console.log(this._listFilter);

    return this._value;
  }

  set value(value: string) {
    // console.log("setter");
    this._value = value.toLowerCase();

    this.filteredPostList = this.value ? this.performFilter(this.value) : this.allPosts;
  }

  performFilter(filterBy: string): Post[] {
    return this.allPosts.filter((post: Post) =>
      post.postName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private userService: UserService, private postService: PostService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.showUserPost();
    this.spinner.show();
  }

  showUserPost() {
    this.userService.getUser(localStorage.getItem(TOKEN_USER))
      .subscribe(
        result => this.userService.getAllPostsOfUser(result.id)
          .subscribe(result => {
          this.allPosts = result;
            this.filteredPostList = this.allPosts;
            this.isLoading = false; this.spinner.hide()
          }, error => console.log(error)),
        error => console.log(error))
  }

  onDelete(id: number) {
    this.postService.deletePost(id).subscribe(result => { console.log(result); this.showUserPost() }, error => console.log(error));
  }
}
