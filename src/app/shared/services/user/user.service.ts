import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { User } from '../../models/user/user.model';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  public getByEmailAndPassword(
    email: string,
    password: string,
  ): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);
    return this.httpClient.get<User[]>(this.baseUrl, { params }).pipe(
      map((users) =>
        users.filter(
          (user) => email === user.email && password === user.password,
        ),
      ),
      catchError(this.handleError),
    );
  }

  public add(user: User): Observable<any> {
    return this.httpClient
      .post<User>(this.baseUrl, user)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred when requesting users:', error);
    return throwError(
      () => new Error('Something bad happened! Please, try again later.'),
    );
  }
}
