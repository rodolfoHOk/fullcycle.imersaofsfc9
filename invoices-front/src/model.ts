export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  slug: string;
  price: number;
  created_at: string;
}

export interface CreditCard {
  number: string;
  name: string;
  expiration_month: number | string;
  expiration_year: number | string;
  cvv: string;
}

export enum OrderStatus {
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected',
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  credit_card: Omit<CreditCard, 'cvv' | 'name'>;
  items: OrderItem[];
  status: OrderStatus;
}

export const products: Product[] = [
  {
    id: 'uuid',
    name: 'produto teste 1',
    description: 'muito muito texto',
    price: 50.5,
    image_url: 'https://source.unsplash.com/random/600x600/?product',
    slug: 'produto-teste-1',
    created_at: '2022-08-17T00:00:00',
  },
  {
    id: 'uuid',
    name: 'produto teste 2',
    description: 'muito muito texto',
    price: 50.5,
    image_url: 'https://source.unsplash.com/random/600x600/?product,',
    slug: 'produto-teste-2',
    created_at: '2022-08-17T00:00:00',
  },
];
