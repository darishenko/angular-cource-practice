import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Review } from '../../models/review/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly baseUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) {}

  public getByProductId(productId: number): Observable<Review[]> {
    const params = new HttpParams().append('productId', productId);
    return this.http
      .get<Review[]>(this.baseUrl, {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('an error occurred when requesting reviews:', error);
    return throwError(
      () => new Error('Something bad happened! Please, try again later.'),
    );
  }
}
