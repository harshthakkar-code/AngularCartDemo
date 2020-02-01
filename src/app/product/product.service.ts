import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endPoints } from '../../environments/environment';
import { ProductModel } from './productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = endPoints.apiURL + 'products/';
  constructor(private _http : HttpClient) { }

  getAllProducts() {
    return this._http.get(this.url);
  }

  getProductById(productId) {
    return this._http.get(this.url + productId);
  }

  addProduct(item: ProductModel) {
    const body = JSON.stringify(item);
    return this._http.post(this.url, body, {headers: endPoints.header});
  }

  updateProduct(item: ProductModel) {
    const body = JSON.stringify(item);
    return this._http.post(this.url, body, {headers: endPoints.header});
  }
}
