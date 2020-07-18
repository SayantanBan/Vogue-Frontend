import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import {
  TOKEN_AUTH_PASSWORD,
  TOKEN_AUTH_USERNAME,
} from "../Services/auth.constant";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  static AUTH_TOKEN = "https://my-vogue.herokuapp.com/oauth/token";

  constructor(private _http: HttpClient) {}

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}&grant_type=password`;

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(TOKEN_AUTH_USERNAME + ":" + TOKEN_AUTH_PASSWORD),
      }),
    };

    return this._http
      .post(AuthenticationService.AUTH_TOKEN, body, httpOptions)
      .pipe(map((res) => res))
      .pipe(
        map((res: any) => {
          if (res.access_token) {
            return res.access_token;
          }
          return null;
        })
      );
  }
}
