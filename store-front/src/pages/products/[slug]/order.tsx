import {
  Avatar,
  Box,
  Button,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { api, http } from '../../../http';
import { CreditCard, Product } from '../../../model';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface OrderProps {
  product: Product;
}

const OrderPage: NextPage<OrderProps> = ({ product }) => {
  const { register, handleSubmit } = useForm<CreditCard>();

  const onSubmit = async (data: CreditCard) => {
    data.expiration_month = parseInt(data.expiration_month as string);
    data.expiration_year = parseInt(data.expiration_year as string);
    console.log(data);
    const { data: order } = await api.post('orders', {
      credit_card: data,
      items: [{ product_id: product.id, quantity: 1 }],
    });
    console.log(order);
  };

  return (
    <div>
      <Head>
        <title>Pagamento</title>
      </Head>

      <main>
        <Typography
          component="h1"
          variant="h3"
          color="textPrimary"
          gutterBottom
        >
          Checkout
        </Typography>

        <ListItem>
          <ListItemAvatar>
            <Avatar src={product.image_url} />
          </ListItemAvatar>

          <ListItemText primary={product.name} secondary={product.price} />
        </ListItem>

        <Typography component="h2" variant="h6" gutterBottom>
          Pague com cartão de crédito
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('name')}
                label="Nome"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('number')}
                label="Número do cartão"
                fullWidth
                inputProps={{ maxLength: 19 }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('cvv')}
                type="number"
                label="CVV"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    {...register('expiration_month')}
                    type="number"
                    label="Expiração mês"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register('expiration_year')}
                    type="number"
                    label="Expiração ano"
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box marginTop={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Efetuar Pagamento
            </Button>
          </Box>
        </form>
      </main>
    </div>
  );
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps<
  OrderProps,
  { slug: string }
> = async (context) => {
  const { slug } = context.params!;
  try {
    const { data: product } = await http.get(`/products/${slug}`);
    return {
      props: {
        product,
      },
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
