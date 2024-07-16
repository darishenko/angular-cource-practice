import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CartItem } from '../../models/cart-item/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly baseUrl = 'http://localhost:3000/cart';

  constructor(private httpClient: HttpClient) {}

  public getCart(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  public getItem(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/${id}`);
  }

  public addItem(cartItem: CartItem): Observable<any> {
    return this.httpClient.post(this.baseUrl, cartItem);
  }

  public deleteItem(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `/${id}`);
  }

  public updateItem(cartItem: CartItem): Observable<any> {
    const itemId = cartItem.id;
    if (cartItem.count === 0) {
      return this.deleteItem(itemId);
    } else {
      return this.httpClient.patch(this.baseUrl + `/${itemId}`, cartItem).pipe(
        catchError((error) => {
          if (!(error.error instanceof ErrorEvent)) {
            if (error.status === 404) {
              return this.addItem(cartItem);
            }
          }
          return throwError(() => error);
        }),
      );
    }
  }
}
