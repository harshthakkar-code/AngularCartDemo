import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ProductModel } from './productModel';
import { Cart } from '../cart/cart';
import { CartDetail } from '../cart/cartDetail';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  arrProductList: ProductModel[] = [];
  cartProductItem: ProductModel = null;
  currentCartItem: CartDetail = null;

  SubTotal: number = 0;
  GrandTotal: number = 0;
  // UserId: string = localStorage.getItem('UserId');
  UserId: string = '1';

  ProductImgPath = 'assets/ProductImages/';

  constructor(private _productData: ProductService, private _cartService: CartService, private _router: Router) {}

  ngOnInit() {
    this._productData.getAllProducts().subscribe((data: ProductModel[]) => {
      this.arrProductList = data;
    });
  }

  onAddToCart(SelectedProductID) {
    if (this.UserId == null) {
        alert('Go to Login');
    }
    else {
    this._productData.getProductById(SelectedProductID).subscribe(
      (data: ProductModel) => {

        this.cartProductItem = data;
        this.SubTotal = this._cartService.doSubTotal(this.cartProductItem.price, 1);
        this.currentCartItem = new CartDetail(this.cartProductItem, 1, this.SubTotal);

        // first item of the cart
        if (localStorage.getItem('cart') == null) {

          const cartItems: CartDetail[] = [];
          cartItems.push(this.currentCartItem);

          this.GrandTotal = this._cartService.doGrandTotal(cartItems);

          const myCart = new Cart(cartItems, this.GrandTotal, this.UserId);
          localStorage.setItem('cart', JSON.stringify(myCart));
        }
        else {
          // cart has already some itmes
          const cart: Cart = JSON.parse(localStorage.getItem('cart')) as Cart;
          let index: number = -1;

          if (cart.CartItems.length >= 0) {

            // getting index of product
            index = cart.CartItems.map(function(x) {
              return x.Product.id;
            }).indexOf(SelectedProductID);

            // if current product does not exist in cart then add it
            if (index == -1) {
              cart.CartItems.push(this.currentCartItem);

              cart.GrandTotal = this._cartService.doGrandTotal(cart.CartItems);
              cart.UserId = this.UserId;

              localStorage.setItem('cart', JSON.stringify(cart));
            }
            else {
              let item: CartDetail = cart.CartItems[index];
              item.Quantity += 1;
              item.SubTotal = this._cartService.doSubTotal(this.cartProductItem.price, item.Quantity);
              cart.CartItems[index] = item;

              cart.GrandTotal = this._cartService.doGrandTotal(cart.CartItems);
              cart.UserId = this.UserId;

              localStorage.setItem('cart', JSON.stringify(cart));
            }
          }
        }
        console.log(localStorage.getItem('cart'));
        this._router.navigate(['/shoppingcart']);
      });
    }
  }

  onRemoveFromCart(SelectedProductID) {
    if (this.UserId != null) {
      this._cartService.onRemoveFromCart(SelectedProductID);
      this._router.navigate(['/shoppingcart']);
    }
  }
}
