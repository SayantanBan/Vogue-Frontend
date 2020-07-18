import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "src/app/Shared/Services/post.service";
import { UserService } from "src/app/Shared/Services/user.service";
import { TOKEN_USER } from "src/app/Shared/Services/auth.constant";
import { Post } from "src/app/Shared/Models/Post";
import { NgxSpinnerService } from "ngx-spinner";
import { DataStorageService } from "../service/data-storage.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-posts",
  templateUrl: "./user-posts.component.html",
  styleUrls: ["./user-posts.component.scss"],
})
export class UserPostsComponent implements OnInit, OnDestroy {
  p: number = 1;
  numbers: number[];
  allPosts: Post[];
  isLoading = true;
  sortedTitleSearch: boolean;
  filteredPostList: Post[];
  fetchPost: Subscription;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private dataStorageService: DataStorageService
  ) {
    this.sortedTitleSearch = false;
  }
  ngOnDestroy(): void {
    if (this.fetchPost != null) this.fetchPost.unsubscribe();
  }

  ngOnInit() {
    this.showUserPost();
    this.spinner.show();
  }

  showUserPost() {
    this.userService.getUser(localStorage.getItem(TOKEN_USER)).subscribe(
      (result) =>
        this.userService.getAllPostsOfUser(result.id).subscribe(
          (result) => {
            this.allPosts = result;
            this.filteredPostList = this.allPosts;
            this.p = Math.ceil(this.filteredPostList.length / 10);
            this.numbers = Array(this.p)
              .fill(0)
              .map((x, i) => i);
            this.isLoading = false;
            this.spinner.hide();
            this.fetchPost = this.dataStorageService.fetchPosts().subscribe();
          },
          (error) => console.log(error)
        ),
      (error) => console.log(error)
    );
  }

  onDelete(id: number) {
    this.postService.deletePost(id).subscribe(
      (result) => {
        console.log(result);
        this.showUserPost();
        this.fetchPost = this.dataStorageService.fetchPosts().subscribe();
      },
      (error) => console.log(error)
    );
  }
}
