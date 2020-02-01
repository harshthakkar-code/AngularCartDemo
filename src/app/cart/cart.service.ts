import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { CartDetail } from './cartDetail';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  onRemoveFromCart(SelectedProductID): number {
    if (localStorage.getItem('cart') != null) {
      let cart: Cart = JSON.parse(localStorage.getItem('cart')) as Cart;
      let index: number = -1;

      if (cart.CartItems.length >= 0) {
        // getting index of product
        index = cart.CartItems.map(function(x) {
          return x.Product.id;
        }).indexOf(SelectedProductID);

        if (index != -1) {
          cart.CartItems.splice(index, 1);
          cart.GrandTotal = this.doGrandTotal(cart.CartItems);
          localStorage.setItem('cart', JSON.stringify(cart));
          return cart.GrandTotal;
        }
      }
    }
    return 0;
  }

  doSubTotal(Price, Quantity): number {
    return Price * Quantity;
  }

  doGrandTotal(cartItems: CartDetail[]): number {
    let GrandTotal: number = 0;
    if (cartItems != null) {
      if (cartItems.length >= 0) {
        for(let i = 0; i < cartItems.length; i++) {
          GrandTotal += cartItems[i].SubTotal;
        }
      }
    }
    return GrandTotal;
  }
}
