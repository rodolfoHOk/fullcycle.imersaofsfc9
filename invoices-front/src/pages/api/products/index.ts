import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from '../../../http';
import { Product, products } from '../../../model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | []>
) {
  const response = await api.get<Product[]>('/products');
  res.status(200).json(response.data);

  // res.status(200).json(products);
}
