import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  public get(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + id, {});
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `/${id}`);
  }
}
