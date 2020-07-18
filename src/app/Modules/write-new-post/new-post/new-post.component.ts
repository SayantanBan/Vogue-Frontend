import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from "src/app/Shared/Services/post.service";
import { Post } from "src/app/Shared/Models/Post";
import { UserService } from "src/app/Shared/Services/user.service";
import { TOKEN_USER } from "src/app/Shared/Services/auth.constant";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoryService } from "src/app/Shared/Services/category.service";
import { Category } from "src/app/Shared/Models/Category";
import { NgxSpinnerService } from "ngx-spinner";
import { DataStorageService } from "../../home-page/service/data-storage.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NewPostComponent implements OnInit, OnDestroy {
  editorForm: FormGroup;
  editorContent: string;
  newPost: Post = {};
  checked = false;
  checkedAllow = false;
  fetchNewPosts: Subscription;

  editorStyle: {
    height: "250px;";
  };

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnDestroy(): void {
    if (this.fetchNewPosts) this.fetchNewPosts.unsubscribe();
  }

  postId: number;
  categories: Category[];

  ngOnInit() {
    this.editorForm = new FormGroup({
      title: new FormControl("", Validators.required),
      editor: new FormControl(null, Validators.required),
      isActive: new FormControl(true),
      allowComments: new FormControl(false),
      category: new FormControl(1, Validators.required),
    });

    this.spinner.show();
    this.postId = this.route.snapshot.params["id"];
    this.categoryService.getAllCategories().subscribe(
      (result) => (this.categories = result),
      (error) => console.log(error)
    );

    if (this.postId == null) this.spinner.hide();
    else if (this.postId != null) {
      this.postService.getPost(this.postId).subscribe(
        (result) => {
          this.newPost = result;
          console.log(result);
          this.editorForm = new FormGroup({
            title: new FormControl(this.newPost.postName, Validators.required),
            editor: new FormControl(
              this.newPost.postContent,
              Validators.required
            ),
            isActive: new FormControl(this.newPost.status),
            allowComments: new FormControl(this.newPost.allowComment),
            category: new FormControl(
              this.newPost.category.id,
              Validators.required
            ),
          });
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onSubmit() {
    if (this.editorForm.valid) {
      this.editorContent = this.editorForm.get("editor").value;
    }
  }

  onSave() {
    if (this.postId == null) {
      this.userService.getUser(localStorage.getItem(TOKEN_USER)).subscribe(
        (result) => {
          this.newPost.postName = this.editorForm.get("title").value;
          this.newPost.status = this.editorForm.get("isActive").value;
          this.newPost.allowComment = this.editorForm.get(
            "allowComments"
          ).value;
          this.newPost.postDate = new Date();
          this.newPost.postContent = this.editorContent;
          this.postService
            .addPost(
              this.newPost,
              result.id,
              this.editorForm.get("category").value
            )
            .subscribe(() => {
              this.editorContent = "";
              this.editorForm.reset();
              this.fetchNewPosts = this.dataStorageService
                .fetchPosts()
                .subscribe();
              this.router.navigate(["/home/dashboard/myposts"]);
            });
        },
        (error) => console.log(error)
      );
    } else {
      this.userService.getUser(localStorage.getItem(TOKEN_USER)).subscribe(
        (result) => {
          this.newPost.postName = this.editorForm.get("title").value;
          this.newPost.status = this.editorForm.get("isActive").value;
          this.newPost.allowComment = this.editorForm.get(
            "allowComments"
          ).value;
          this.newPost.lastEdit = new Date();
          this.newPost.postContent = this.editorContent;

          this.postService
            .putPost(
              this.newPost,
              result.id,
              this.editorForm.get("category").value
            )
            .subscribe(() => {
              this.editorContent = "";
              this.editorForm.reset();
              this.fetchNewPosts = this.dataStorageService
                .fetchPosts()
                .subscribe();
              this.router.navigate(["/home/dashboard/myposts"]);
            });
        },
        (error) => console.log(error)
      );
    }
  }
}
