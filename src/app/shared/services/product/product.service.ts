import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) {}

  public getAll(params?: HttpParams): Observable<any> {
    return this.httpClient.get(this.baseUrl, { params });
  }

  public get(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/${id}`, {});
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `/${id}`);
  }

  public updatePartial(product: Product): Observable<any> {
    return this.httpClient.patch(this.baseUrl + `/${product.id}`, product);
  }
}
