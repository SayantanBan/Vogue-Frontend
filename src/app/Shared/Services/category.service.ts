import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { Category } from '../Models/Category';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesChanged = new Subject<Category[]>();
  private categories: Category[] = [];

  categoryUrl = "https://my-vogue.herokuapp.com/public/category";

  constructor(private http: HttpClient) { }

  setCategories(categories: Category[]) {
    this.categories = categories;
    this.categoriesChanged.next(this.categories.slice());
  }

  getCategories() {
    return this.categories.slice();
  }

  getUniqueCategory(index: number) {
    return this.categories[index];
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error)
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.categoryUrl + "/" + id).pipe(
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
