import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PostService } from 'src/app/Shared/Services/post.service';
import { Post } from 'src/app/Shared/Models/Post';
import { retry, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Category } from 'src/app/Shared/Models/Category';
import { CategoryService } from 'src/app/Shared/Services/category.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../Shared/Store/app.reducer'
import * as PostsActions from '../../../Shared/Store/post.actions'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  postPublicUrl = "/public/posts"
  categoryUrl = "/public/category";

  constructor(private http: HttpClient,
    private postService: PostService,
    private categoryService: CategoryService,
    private store: Store<fromApp.AppState>) { }

  fetchPosts() {
    return this.http.get<Post[]>(this.postPublicUrl).pipe(
      // tap(posts => this.store.dispatch(new PostsActions.SetPosts(posts))),
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError),
      tap(posts => {
        this.postService.setPosts(posts);
        this.store.dispatch(new PostsActions.SetPosts(posts));
      }) // then handle the error)
    );
  }

  fetchCategories() {
    return this.http.get<Category[]>(this.categoryUrl).pipe(
      // tap(posts => this.store.dispatch(new PostsActions.SetPosts(posts))),
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError),
      tap(categories => {
        this.categoryService.setCategories(categories);
      }) // then handle the error)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
