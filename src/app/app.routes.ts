import { Routes } from '@angular/router';
import { HomeComponent } from './home/pages/home.component';
import { ProductDetailsComponent } from './product-info/pages/product-details.component';
import { ProductEditComponent } from './product-info-edit/pages/product-edit.component';
import { CartComponent } from './cart/pages/cart.component';
import { AuthComponent } from './auth/pages/auth.component';
import { authGuard } from './auth/guards/auth.guard';

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
