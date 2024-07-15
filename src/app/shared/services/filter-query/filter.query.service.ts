import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FilterQueryService {
  productFilter: { [key: string]: { param: string; initValue?: any } } = {
    ratingFrom: { param: 'rating.rate_gte' },
    ratingTo: { param: 'rating.rate_lte' },
    priceFrom: { param: 'price_gte' },
    priceTo: { param: 'price_lte' },
    inStock: { param: 'stock_gt', initValue: 0 },
    hasReviews: { param: 'rating.count_gt', initValue: 0 },
  };

  constructor() {}

  createFilterHttpParams(formValues: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    for (let param in formValues) {
      let paramValue = formValues[param];
      if (paramValue != null) {
        const filterItem = this.productFilter[param];
        httpParams = httpParams.set(
          filterItem?.param,
          filterItem?.initValue ?? paramValue,
        );
      }
    }
    return httpParams;
  }

  createFilterFormParams(formValues: any): { [key: string]: any } {
    let result: { [key: string]: any } = {};
    for (let param in formValues) {
      let paramValue = formValues[param];
      if (paramValue != null) {
        result[param] = paramValue;
      }
    }
    return result;
  }
}
