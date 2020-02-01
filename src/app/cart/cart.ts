import { CartDetail } from './cartDetail';

export class Cart {
  public constructor(
    public CartItems: CartDetail[],
    public GrandTotal: number,
    public UserId: string
  ) {}
}
