import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../Models/Post';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { TOKEN_NAME } from './auth.constant';
import { Store } from '@ngrx/store';
import * as fromApp from '../Store/app.reducer';
import * as PostsActions from '../Store/post.actions';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsChanged = new Subject<Post[]>();
  private posts: Post[] = [];

  constructor(private http: HttpClient,
    private store: Store<fromApp.AppState>) { }

  setPosts(posts: Post[]) {
    this.posts = posts;
    this.postsChanged.next(this.posts.slice());
  }

  getPosts() {
    return this.posts.slice();
  }

  getUniquePost(index: number) {
    return this.posts[index];
  }

  postPublicUrl = "/public/posts"
  postSecuredUrl = "/authenticated"

  addPost(post: Post, id: number, categoryId: number): Observable<Post> {
    return this.http.post<Post>(this.postSecuredUrl + "/posts", { post, id, categoryId })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error)
      );
  }


  putPost(post: Post, id: number, categoryId: number) {
    return this.http.put(this.postSecuredUrl + "/posts", { post, id, categoryId })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error)
      );
  }

  deletePost(id: number) {
    return this.http.delete(this.postSecuredUrl + "/posts/" + id)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error)
      );
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postPublicUrl).pipe(
      // tap(posts => this.store.dispatch(new PostsActions.SetPosts(posts))),
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error)
    );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.postPublicUrl + "/" + id).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error)
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
