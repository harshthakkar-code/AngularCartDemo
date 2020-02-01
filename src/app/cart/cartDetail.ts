import { ProductModel } from '../product/productModel';

export class CartDetail {
  public constructor(
    public Product: ProductModel,
    public Quantity: number,
    public SubTotal: number
  ) {}
}
