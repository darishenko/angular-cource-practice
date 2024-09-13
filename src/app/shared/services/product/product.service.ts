import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) {}

  public getAll(params?: HttpParams): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(this.baseUrl, { params })
      .pipe(catchError(this.handleError));
  }

  public get(id: number): Observable<Product> {
    return this.httpClient
      .get<Product>(this.baseUrl + `/${id}`)
      .pipe(catchError(this.handleError));
  }

  public delete(id: number): Observable<any> {
    return this.httpClient
      .delete(this.baseUrl + `/${id}`)
      .pipe(catchError(this.handleError));
  }

  public updatePartial(product: Product): Observable<Product> {
    return this.httpClient
      .patch<Product>(this.baseUrl + `/${product.id}`, product)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred when requesting products:', error);
    return throwError(
      () => new Error('Something bad happened! Please, try again later.'),
    );
  }
}
