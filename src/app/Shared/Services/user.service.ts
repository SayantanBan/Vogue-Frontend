import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME, TOKEN_USER } from './auth.constant';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../Models/User';
import { Post } from '../Models/Post';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  accessToken: string;
  isAdmin: boolean;
  userName: string;

  userUrl = "https://my-vogue.herokuapp.com/authenticated/users"

  constructor(private http: HttpClient) { }

  login(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    console.log(decodedToken);
    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN_USER');
    this.accessToken = accessToken;

    localStorage.setItem(TOKEN_USER, decodedToken.user_name);
    localStorage.setItem(TOKEN_NAME, accessToken);
  }

  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(TOKEN_USER);
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.accessToken && !this.isAdmin;
  }

  checkToken(): boolean {
    return this.jwtHelper.isTokenExpired(localStorage.getItem(TOKEN_NAME));
  }

  getUser(userName: string): Observable<User> {
    var access_token = localStorage.getItem(TOKEN_NAME);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      })
    };
    
    return this.http.get<User>("https://my-vogue.herokuapp.com/authenticated/users/login/" + userName, httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error)
    );
  }

  getAllPostsOfUser(id: number) : Observable<Post[]> {
    var access_token = localStorage.getItem(TOKEN_NAME);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      })
    };
    return this.http.get<Post[]>(this.userUrl + "/posts/" + id, httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  newUser(username: string, firstname:string, lastname: string) {
    let url = 'https://my-vogue.herokuapp.com/public/users/newUser';
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${access_token}`
      })
    };

  	let userInfo = {
  		"username" : username,
      "firstname" : firstname,
      "lastname" : lastname
  	}

  	return this.http.post(url, JSON.stringify(userInfo), httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
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
