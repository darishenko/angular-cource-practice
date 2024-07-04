export class Product {
  id!: number;
  title!: string;
  price!: number;
  description!: string;
  image!: string;
  stock!: number;
  rating!: {
    rate: number;
    count: number;
  };
}
