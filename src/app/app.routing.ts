import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product/product-list.component';
import { CartComponent } from './cart/cart.component';

const arr: Routes = [
  { path: '', component: ProductListComponent, pathMatch: 'full'},
  { path: 'products', component: ProductListComponent},
  { path: 'shoppingcart', component: CartComponent},
  { path: '**', component: ProductListComponent }
];

export const routingArr = RouterModule.forRoot(arr);
