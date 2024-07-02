import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly baseUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) {}

  public getByProductId(productId: number): Observable<any> {
    const params = new HttpParams().append('productId', productId);

    return this.http.get(this.baseUrl, {
      params: params,
    });
  }
}
