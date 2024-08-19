import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly baseUrl = 'http://localhost:3000/cart';

  constructor(private httpClient: HttpClient) {}

  public getCart(): Observable<CartItem[]> {
    return this.httpClient
      .get<CartItem[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  public getItem(id: number): Observable<CartItem> {
    return this.httpClient
      .get<CartItem>(this.baseUrl + `/${id}`)
      .pipe(catchError(this.handleError));
  }

  public addItem(cartItem: CartItem): Observable<CartItem> {
    return this.httpClient
      .post<CartItem>(this.baseUrl, cartItem)
      .pipe(catchError(this.handleError));
  }

  public deleteItem(id: number): Observable<any> {
    return this.httpClient
      .delete(this.baseUrl + `/${id}`)
      .pipe(catchError(this.handleError));
  }

  public updateItem(cartItem: CartItem): Observable<CartItem> {
    const itemId = cartItem.id;
    if (cartItem.count === 0) {
      return this.deleteItem(itemId).pipe(catchError(this.handleError));
    } else {
      return this.httpClient
        .patch<CartItem>(this.baseUrl + `/${itemId}`, cartItem)
        .pipe(
          catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 404) {
              return this.addItem(cartItem);
            } else {
              return this.handleError(error);
            }
          }),
        );
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('an error occurred when requesting cart:', error);
    return throwError(
      () => new Error('Something bad happened! Please, try again later.'),
    );
  }
}
