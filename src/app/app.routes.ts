import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { ProductDetailsComponent } from './shared/pages/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
];
