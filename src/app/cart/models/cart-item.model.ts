export class CartItem {
  id!: number;
  title?: string;
  count?: number;
  price?: number;

  constructor(id: number, title: string, count: number, price: number) {
    this.id = id;
    this.title = title;
    this.count = count;
    this.price = price;
  }
}
