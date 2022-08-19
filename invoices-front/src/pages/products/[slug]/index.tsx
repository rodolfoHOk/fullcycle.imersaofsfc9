import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { http } from '../../../http';
import { Product } from '../../../model';
import axios from 'axios';
import Link from 'next/link';

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{product.name} - Detalhes do produto</title>
      </Head>

      <main>
        <Typography
          component="h1"
          variant="h3"
          color="textPrimary"
          gutterBottom
        >
          Produtos
        </Typography>

        <span>Detalhes do produto</span>

        <Card sx={{ marginTop: '24px' }}>
          <CardHeader
            title={product.name.toUpperCase()}
            subheader={`R$ ${product.price}`}
          />

          <CardActions>
            <Link
              href="/products/[slug]/order"
              as={`/products/${product.slug}/order`}
              passHref
            >
              <Button size="small" color="primary" component="a">
                Comprar
              </Button>
            </Link>
          </CardActions>

          <CardMedia
            sx={{ maxWidth: 600 }}
            image={product.image_url}
            component="img"
          />

          <CardContent>
            <Typography component="p" variant="body2" color="textSecondary">
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProductDetailPage;

export const getStaticProps: GetStaticProps<
  ProductDetailPageProps,
  { slug: string }
> = async (context) => {
  const { slug } = context.params!;
  try {
    const { data: product } = await http.get(`/products/${slug}`);
    return {
      props: {
        product,
      },
      revalidate: 1 * 60 * 2,
    };
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw e;
  }
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data: products } = await http.get(`/products`);

  const paths = products.map((p: Product) => ({
    params: {
      slug: p.slug,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
