import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { http } from '../http';
import { Product } from '../model';

interface ProductsListPageProps {
  products: Product[];
}

const ProductsListPage: NextPage<ProductsListPageProps> = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Listagem de produtos</title>
        {/* 
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" /> 
        */}
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

        <span>Listagem de produtos</span>

        <Grid sx={{ marginTop: '24px' }} container spacing={4}>
          {products.map((product, key) => (
            <Grid key={key} item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia image={product.image_url} component="img" />

                <CardContent>
                  <Typography component="h2" variant="h5" gutterBottom>
                    {product.name}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Link
                    href="/products/[slug]"
                    as={`/products/${product.slug}`}
                    passHref
                  >
                    <Button size="small" color="primary" component="a">
                      Detalhes
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
};

export default ProductsListPage;

export const getServerSideProps: GetServerSideProps<
  ProductsListPageProps
> = async (context) => {
  const { data: products } = await http.get('/products');
  return {
    props: {
      products,
    },
  };
};
