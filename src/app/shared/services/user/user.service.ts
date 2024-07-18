import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../models/user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  public getByEmailAndPassword(
    email: string,
    password: string,
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);
    return this.httpClient.get<User[]>(this.baseUrl, { params: params });
  }

  public add(user: User): Observable<any> {
    return this.httpClient.post<User>(this.baseUrl, user);
  }
}
