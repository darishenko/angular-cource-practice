import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { ProductDetailsComponent } from './shared/pages/product-details/product-details.component';
import { ProductEditComponent } from './shared/pages/product-edit/product-edit.component';
import { CartComponent } from './shared/pages/cart/cart.component';
import { AuthComponent } from './shared/pages/auth/auth.component';
import { authGuard } from './shared/guard/auth/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'product/edit/:id',
    component: ProductEditComponent,
    canActivate: [authGuard],
  },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: '', component: HomeComponent },
];
