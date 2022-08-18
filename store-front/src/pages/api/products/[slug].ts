import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from '../../../http';
import { Product, products } from '../../../model';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | { message: string }>
) {
  const { slug } = req.query;
  api
    .get<Product>(`/products/${slug}`)
    .then((response) => res.status(200).json(response.data))
    .catch((err) =>
      res.status(404).json({ message: 'Produto não encontrado' })
    );

  // const product = products.find((p) => p.slug === slug);
  // product
  //   ? res.status(200).json(product)
  //   : res.status(404).json({ message: 'Product not found' });
}
