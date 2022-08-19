import { NextPage } from 'next';
import InvoicesListPage from './invoices';

const ProductsListPage: NextPage = () => {
  return <InvoicesListPage creditCards={[]} />;
};

export default ProductsListPage;
