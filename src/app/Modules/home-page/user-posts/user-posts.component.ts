import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/Shared/Services/post.service";
import { UserService } from "src/app/Shared/Services/user.service";
import { TOKEN_USER } from "src/app/Shared/Services/auth.constant";
import { Post } from "src/app/Shared/Models/Post";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-user-posts",
  templateUrl: "./user-posts.component.html",
  styleUrls: ["./user-posts.component.scss"],
})
export class UserPostsComponent implements OnInit {
  p: number = 1;
  numbers: number[];
  allPosts: Post[];
  isLoading = true;
  _value: string;
  _titleSearch: string;
  sortedTitleSearch: boolean;
  _postdateSearch: string;
  _editdateSearch: string;
  _categorySearch: string;
  _statusSearch: string;
  _commentsAlowedSearch: string;
  filteredPostList: Post[];

  get value(): string {
    // console.log("getter");
    // console.log(this._listFilter);
    return this._value;
  }

  set value(value: string) {
    // console.log("setter");
    this._value = value.toLowerCase();
    this.filteredPostList = this.value
      ? this.performFilter(this.value, 1)
      : this.allPosts;
  }

  get titleSearch(): string {
    return this._titleSearch;
  }

  set titleSearch(value: string) {
    this._titleSearch = value.toLowerCase();
    this.filteredPostList = this.titleSearch
      ? this.performFilter(this.titleSearch, 2)
      : this.allPosts;
  }

  get postdateSearch(): string {
    return this._postdateSearch;
  }

  set postdateSearch(value: string) {
    this._postdateSearch = value.toLowerCase();
    this.filteredPostList = this.postdateSearch
      ? this.performFilter(this.postdateSearch, 3)
      : this.allPosts;
  }

  get statusSearch(): string {
    return this._statusSearch;
  }

  set statusSearch(value: string) {
    this._statusSearch = value.toLowerCase();
    this.filteredPostList = this.statusSearch
      ? this.performFilter(this.statusSearch, 4)
      : this.allPosts;
  }

  get categorySearch(): string {
    return this._categorySearch;
  }

  set categorySearch(value: string) {
    this._categorySearch = value.toLowerCase();
    this.filteredPostList = this.categorySearch
      ? this.performFilter(this.categorySearch, 5)
      : this.allPosts;
  }

  get commentsAlowedSearch(): string {
    // console.log("getter");
    // console.log(this._listFilter);
    return this._value;
  }

  set commentsAlowedSearch(value: string) {
    // console.log("setter");
    this._commentsAlowedSearch = value.toLowerCase();
    this.filteredPostList = this.commentsAlowedSearch
      ? this.performFilter(this.commentsAlowedSearch, 6)
      : this.allPosts;
  }

  get editdateSearch(): string {
    // console.log("getter");
    // console.log(this._listFilter);
    return this._editdateSearch;
  }

  set editdateSearch(value: string) {
    // console.log("setter");
    this._editdateSearch = value.toLowerCase();
    // this.filteredPostList = this.commentsAlowedSearch
    //   ? this.performFilter(this.commentsAlowedSearch, 6)
    //   : this.allPosts;
  }

  performFilter(filterBy: string, value: number): Post[] {
    if (value == 1)
      return this.filteredPostList.filter(
        (post: Post) =>
          post.postName.toLocaleLowerCase().indexOf(filterBy) !== -1
      );
    else if (value == 2)
      return this.filteredPostList.filter(
        (post: Post) =>
          post.postName.toLocaleLowerCase().indexOf(filterBy) !== -1
      );
    else if (value == 3)
      return this.filteredPostList.filter(
        (post: Post) =>
          String(post.postDate).toLocaleLowerCase().indexOf(filterBy) !== -1
      );
    else if (value == 4)
      return this.filteredPostList.filter((post: Post) => {
        console.log(String(post.status));
        String(post.status).indexOf(filterBy) !== -1;
      });
    else if (value == 5)
      return this.filteredPostList.filter(
        (post: Post) =>
          post.category.categoryName
            .toString()
            .toLocaleLowerCase()
            .indexOf(filterBy) !== -1
      );
    else if (value == 5)
      return this.filteredPostList.filter(
        (post: Post) =>
          post.allowComment.toString().toLocaleLowerCase().indexOf(filterBy) !==
          -1
      );
  }

  constructor(
    private userService: UserService,
    private postService: PostService,
    private spinner: NgxSpinnerService
  ) {
    this.sortedTitleSearch = false;
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
      },
      (error) => console.log(error)
    );
  }

  onSort(column: number) {
    switch (column) {
      case 1:
        if (this.sortedTitleSearch) {
          console.log("Sorting Ascending:");
          this.filteredPostList.sort((a, b) =>
            a.postName > b.postName ? -1 : 1
          );
          this.sortedTitleSearch = false;
        } else {
          console.log("Sorting Descending:");
          this.filteredPostList.sort((a, b) =>
            a.postName < b.postName ? -1 : 1
          );
          this.sortedTitleSearch = true;
        }
        break;
      case 2:
        if (this.sortedTitleSearch) {
          console.log("Sorting Ascending:");
          this.filteredPostList.sort((a, b) =>
            a.postDate > b.postDate ? -1 : 1
          );
          this.sortedTitleSearch = false;
        } else {
          console.log("Sorting Descending:");
          this.filteredPostList.sort((a, b) =>
            a.postDate < b.postDate ? -1 : 1
          );
          this.sortedTitleSearch = true;
        }
        break;
      case 3:
        if (this.sortedTitleSearch) {
          console.log("Sorting Ascending:");
          this.filteredPostList.sort((a, b) =>
            a.lastEdit > b.lastEdit ? -1 : 1
          );
          this.sortedTitleSearch = false;
        } else {
          console.log("Sorting Descending:");
          this.filteredPostList.sort((a, b) =>
            a.lastEdit < b.lastEdit ? -1 : 1
          );
          this.sortedTitleSearch = true;
        }
        break;
      case 4:
        if (this.sortedTitleSearch) {
          console.log("Sorting Ascending:");
          this.filteredPostList.sort((a, b) =>
            a.category.categoryName > b.category.categoryName ? -1 : 1
          );
          this.sortedTitleSearch = false;
        } else {
          console.log("Sorting Descending:");
          this.filteredPostList.sort((a, b) =>
            a.category.categoryName < b.category.categoryName ? -1 : 1
          );
          this.sortedTitleSearch = true;
        }
        break;
      case 5:
        if (this.sortedTitleSearch) {
          console.log("Sorting Ascending:");
          this.filteredPostList.sort((a, b) => (a.status > b.status ? -1 : 1));
          this.sortedTitleSearch = false;
        } else {
          console.log("Sorting Descending:");
          this.filteredPostList.sort((a, b) => (a.status < b.status ? -1 : 1));
          this.sortedTitleSearch = true;
        }
        break;
      case 6:
        if (this.sortedTitleSearch) {
          console.log("Sorting Ascending:");
          this.filteredPostList.sort((a, b) =>
            a.allowComment > b.allowComment ? -1 : 1
          );
          this.sortedTitleSearch = false;
        } else {
          console.log("Sorting Descending:");
          this.filteredPostList.sort((a, b) =>
            a.allowComment < b.allowComment ? -1 : 1
          );
          this.sortedTitleSearch = true;
        }
        break;
    }
  }

  onPageChange(pageNumber: number) {
    if (this.p == 1 && pageNumber == 1) {
      console.log("firstPage...");
      if (this.filteredPostList.length < 10) {
        this.filteredPostList.slice(0, this.filteredPostList.length);
      }
    } else if (pageNumber + 1 == this.p) {
      console.log("lastPage...");
      if ((pageNumber + 1) * 10 + 10 > this.p) {
        console.log(this.filteredPostList.slice(pageNumber * 10, this.p));
        this.filteredPostList = this.filteredPostList.slice(
          (pageNumber + 1) * 10,
          this.filteredPostList.length
        );
        console.log(this.filteredPostList);
      }
    } else {
      this.filteredPostList.slice(
        (pageNumber + 1) * 10 + 1,
        (pageNumber + 1) * 10 + 11
      );
    }
  }
}
