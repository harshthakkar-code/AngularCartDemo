import { Component, OnInit } from '@angular/core';
import { Cart } from './cart';
import { CartDetail } from './cartDetail';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // UserId: string = localStorage.getItem('UserId');
  UserId: string = '1';

  arrcartItems: CartDetail [] = [];
  GrandTotal: number = 0;

  ProductImgPath = 'assets/ProductImages/';

  constructor(private _cartService: CartService) { }

  ngOnInit() {
    if (localStorage.getItem('cart') != null && this.UserId != null) {

      let cart: Cart = JSON.parse(localStorage.getItem('cart')) as Cart;

      if (cart.CartItems.length >= 0) {
        this.arrcartItems = cart.CartItems;
      }
      this.GrandTotal = cart.GrandTotal;
    }
  }

  onRemoveFromCart(SelectedProductID, index) {
    if (this.UserId != null) {
      this.GrandTotal = this._cartService.onRemoveFromCart(SelectedProductID);
      this.arrcartItems.splice(index, 1);
    }
  }

  onQtyChange(item: CartDetail, txtQty) {
    console.log("selected item ",item);
    console.log("latest value " , txtQty);


    item.SubTotal = +txtQty * item.Product.price;
    let x:CartDetail[] = [item];
    this.GrandTotal = this._cartService.doGrandTotal(x);
    console.log(item);
  }
}
